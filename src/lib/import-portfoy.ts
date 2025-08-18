import { db } from "./db";
import * as fs from "fs";
import * as path from "path";

interface PortfoyItem {
  ilanNo: string;
  il: string;
  ilce: string;
  mahalle: string;
  nitelik: string;
  ada: string;
  parsel: string;
  m2: string;
  fiyatGrAltin: string;
  imarDurumu: string;
  durum: string;
  hisseTuru: string;
  ilanTarihi: string;
  aciklama: string;
}

export async function importPortfoyData() {
  try {
    console.log("📊 ArsaRazi portföy verileri import ediliyor...");
    
    // CSV dosyasını oku
    const csvPath = path.join(process.cwd(), "arsarazi_portfoy.csv");
    const csvContent = fs.readFileSync(csvPath, "utf-8");
    
    // CSV satırlarını parse et
    const lines = csvContent.split("\n").filter(line => line.trim());
    const headers = lines[0].split(",");
    const dataLines = lines.slice(1);
    
    const portfoyItems: PortfoyItem[] = [];
    
    for (const line of dataLines) {
      const values = line.split(",");
      if (values.length >= 14) {
        const item: PortfoyItem = {
          ilanNo: values[0]?.replace(/"/g, "") || "",
          il: values[1]?.replace(/"/g, "") || "",
          ilce: values[2]?.replace(/"/g, "") || "",
          mahalle: values[3]?.replace(/"/g, "") || "",
          nitelik: values[4]?.replace(/"/g, "") || "",
          ada: values[5]?.replace(/"/g, "") || "",
          parsel: values[6]?.replace(/"/g, "") || "",
          m2: values[7]?.replace(/"/g, "") || "",
          fiyatGrAltin: values[8]?.replace(/"/g, "") || "",
          imarDurumu: values[9]?.replace(/"/g, "") || "",
          durum: values[10]?.replace(/"/g, "") || "",
          hisseTuru: values[11]?.replace(/"/g, "") || "",
          ilanTarihi: values[12]?.replace(/"/g, "") || "",
          aciklama: values[13]?.replace(/"/g, "") || "",
        };
        portfoyItems.push(item);
      }
    }
    
    console.log(`📋 ${portfoyItems.length} adet portföy kaydı bulundu`);
    
    // Veritabanına ekle
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const item of portfoyItems) {
      try {
        // M2'yi sayıya çevir
        const m2Number = parseFloat(item.m2.replace(/[^\d.,]/g, "").replace(",", "."));
        if (isNaN(m2Number) || m2Number <= 0) {
          console.log(`⚠️ Geçersiz M2: ${item.m2} - ${item.ilanNo}`);
          skippedCount++;
          continue;
        }
        
        // Fiyatı TL'ye çevir (gr altın * 2000 TL yaklaşık değer)
        const grAltinPrice = parseFloat(item.fiyatGrAltin.replace(/[^\d.,]/g, "").replace(",", "."));
        const priceTL = grAltinPrice * 2000; // Yaklaşık değer
        
        // Property type'ı belirle
        let propertyType = "Arsa";
        if (item.nitelik.toLowerCase().includes("tarla")) {
          propertyType = "Arazi";
        } else if (item.nitelik.toLowerCase().includes("arsa")) {
          propertyType = "Arsa";
        }
        
        // Status'u belirle
        let status = "BEKLEMEDE";
        if (item.durum.toLowerCase().includes("satışta")) {
          status = "SATISTA";
        } else if (item.durum.toLowerCase().includes("aktif")) {
          status = "SATISTA";
        }
        
        // Zoning status'u belirle
        let zoningStatus = "IMARSIZ";
        let maxFloors: number | undefined;
        let kaks: number | undefined;
        let gabari: number | undefined;
        
        if (item.imarDurumu.toLowerCase().includes("imarlı")) {
          zoningStatus = "IMARLI";
        } else if (item.imarDurumu.toLowerCase().includes("kısmen")) {
          zoningStatus = "KISMEN_IMARLI";
        }
        
        // KAKS değerini çıkar
        const kaksMatch = item.imarDurumu.match(/KAKS:?\s*([\d,]+)/i);
        if (kaksMatch) {
          kaks = parseFloat(kaksMatch[1].replace(",", "."));
        }
        
        // Kat sayısını çıkar
        const katMatch = item.imarDurumu.match(/(\d+(?:,\d+)?)\s*kat/i);
        if (katMatch) {
          maxFloors = parseFloat(katMatch[1].replace(",", "."));
        }
        
        // Hmaks değerini çıkar
        const hmaksMatch = item.imarDurumu.match(/Hmaks:?\s*([\d,]+)\s*metre/i);
        if (hmaksMatch) {
          gabari = parseFloat(hmaksMatch[1].replace(",", "."));
        }
        
        // Admin user'ı bul
        const adminUser = await db.user.findFirst({
          where: {
            role: "ADMIN"
          }
        });
        
        if (!adminUser) {
          console.log(`❌ Admin user bulunamadı`);
          skippedCount++;
          continue;
        }
        
        // Mevcut kayıt var mı kontrol et
        const existingProperty = await db.property.findFirst({
          where: {
            title: {
              contains: item.ilanNo
            }
          }
        });
        
        if (existingProperty) {
          console.log(`⏭️ Zaten mevcut: ${item.ilanNo}`);
          skippedCount++;
          continue;
        }
        
        // Yeni property oluştur
        await db.property.create({
          data: {
            title: `${item.nitelik} - ${item.ilce} ${item.mahalle}`,
            description: item.aciklama || `${item.il} ${item.ilce} ${item.mahalle} ${item.nitelik}`,
            propertyType: propertyType,
            status: status as any,
            city: item.il,
            district: item.ilce,
            neighborhood: item.mahalle,
            address: `${item.ada} ${item.parsel}`,
            netArea: m2Number,
            grossArea: m2Number,
            zoningStatus: zoningStatus as any,
            zoningDetails: item.imarDurumu,
            maxFloors: maxFloors,
            kaks: kaks,
            gabari: gabari,
            priceTL: priceTL,
            priceGoldGrams: grAltinPrice,
            hasElectricity: false,
            hasWater: false,
            hasGas: false,
            hasSewerage: false,
            publicTransportAccess: false,
            ownershipStatus: item.hisseTuru,
            constructionPermit: false,
            userId: adminUser.id,
          }
        });
        
        addedCount++;
        console.log(`✅ Eklendi: ${item.ilanNo} - ${item.nitelik} ${item.ilce}`);
        
      } catch (error) {
        console.error(`❌ Hata: ${item.ilanNo} - ${error}`);
        skippedCount++;
      }
    }
    
    console.log(`\n🎉 Import tamamlandı!`);
    console.log(`✅ Eklenen: ${addedCount}`);
    console.log(`⏭️ Atlanan: ${skippedCount}`);
    console.log(`📊 Toplam: ${portfoyItems.length}`);
    
  } catch (error) {
    console.error("❌ Import hatası:", error);
  }
}

// Script çalıştırma
if (require.main === module) {
  importPortfoyData()
    .then(() => {
      console.log("Import tamamlandı");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Import hatası:", error);
      process.exit(1);
    });
}
