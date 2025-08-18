const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkProperties() {
  try {
    console.log('🔍 Veritabanındaki emlakları kontrol ediliyor...\n');
    
    // Tüm emlakları getir
    const allProperties = await prisma.property.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        isPublished: true,
        city: true,
        district: true
      }
    });
    
    console.log(`📊 Toplam emlak sayısı: ${allProperties.length}`);
    
    // SATISTA durumundaki emlaklar
    const satistaProperties = allProperties.filter(p => p.status === 'SATISTA');
    console.log(`🟢 SATISTA durumundaki emlaklar: ${satistaProperties.length}`);
    
    // Yayınlanmış emlaklar
    const publishedProperties = allProperties.filter(p => p.isPublished === true);
    console.log(`✅ Yayınlanmış emlaklar: ${publishedProperties.length}`);
    
    // Hem SATISTA hem de yayınlanmış emlaklar
    const publishedAndSatista = allProperties.filter(p => p.status === 'SATISTA' && p.isPublished === true);
    console.log(`🎯 Hem SATISTA hem yayınlanmış: ${publishedAndSatista.length}\n`);
    
    if (publishedAndSatista.length > 0) {
      console.log('📋 Yayınlanmış emlaklar:');
      publishedAndSatista.forEach(p => {
        console.log(`  - ${p.title} (${p.city}, ${p.district})`);
      });
    } else {
      console.log('❌ Yayınlanmış emlak bulunamadı!');
      
      console.log('\n📋 Tüm emlaklar:');
      allProperties.forEach(p => {
        console.log(`  - ${p.title} | Status: ${p.status} | Published: ${p.isPublished}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProperties();
