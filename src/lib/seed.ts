import { db } from './db';

export async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Kullanıcıları oluştur
    const adminUser = await db.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'ADMIN',
        phone: '+90 555 123 4567',
        isActive: true,
      },
    });

    const danismanUser = await db.user.upsert({
      where: { email: 'danisman@example.com' },
      update: {},
      create: {
        email: 'danisman@example.com',
        name: 'Mehmet Danışman',
        role: 'DANISMAN',
        phone: '+90 555 234 5678',
        isActive: true,
      },
    });

    const musteriUser = await db.user.upsert({
      where: { email: 'musteri@example.com' },
      update: {},
      create: {
        email: 'musteri@example.com',
        name: 'Ahmet Müşteri',
        role: 'MUSTERI',
        phone: '+90 555 345 6789',
        isActive: true,
      },
    });

    // Müşterileri oluştur
    const customer1 = await db.customer.upsert({
      where: { id: 'customer-1' },
      update: {},
      create: {
        id: 'customer-1',
        name: 'Ali Yılmaz',
        email: 'ali@example.com',
        phone: '+90 555 111 1111',
        type: 'ALICI',
        address: 'Kadıköy, İstanbul',
        city: 'İstanbul',
        district: 'Kadıköy',
        priorityScore: 85,
        isActive: true,
      },
    });

    const customer2 = await db.customer.upsert({
      where: { id: 'customer-2' },
      update: {},
      create: {
        id: 'customer-2',
        name: 'Ayşe Demir',
        email: 'ayse@example.com',
        phone: '+90 555 222 2222',
        type: 'SATICI',
        address: 'Beşiktaş, İstanbul',
        city: 'İstanbul',
        district: 'Beşiktaş',
        priorityScore: 90,
        isActive: true,
      },
    });

    // Emlakları oluştur
    const property1 = await db.property.upsert({
      where: { id: 'property-1' },
      update: {},
      create: {
        id: 'property-1',
        title: 'Merkezi Konut - Kadıköy',
        description: 'Deniz manzaralı, yeni yapılmış lüks daire',
        propertyType: 'Daire',
        status: 'SATISTA',
        city: 'İstanbul',
        district: 'Kadıköy',
        neighborhood: 'Fenerbahçe',
        address: 'Fenerbahçe Mahallesi, Kadıköy',
        netArea: 145,
        grossArea: 160,
        priceTL: 2500000,
        priceUSD: 85000,
        hasElectricity: true,
        hasWater: true,
        hasGas: true,
        hasSewerage: true,
        publicTransportAccess: true,
        userId: danismanUser.id,
        customerId: customer2.id,
      },
    });

    const property2 = await db.property.upsert({
      where: { id: 'property-2' },
      update: {},
      create: {
        id: 'property-2',
        title: 'Villa - Beşiktaş',
        description: 'Bahçeli, havuzlu lüks villa',
        propertyType: 'Villa',
        status: 'SATISTA',
        city: 'İstanbul',
        district: 'Beşiktaş',
        neighborhood: 'Levent',
        address: 'Levent Mahallesi, Beşiktaş',
        netArea: 320,
        grossArea: 380,
        priceTL: 8500000,
        priceUSD: 290000,
        hasElectricity: true,
        hasWater: true,
        hasGas: true,
        hasSewerage: true,
        publicTransportAccess: true,
        userId: danismanUser.id,
      },
    });

    const property3 = await db.property.upsert({
      where: { id: 'property-3' },
      update: {},
      create: {
        id: 'property-3',
        title: 'Arsa - Çekmeköy',
        description: 'İmarlı, yatırıma uygun arsa',
        propertyType: 'Arsa',
        status: 'SATISTA',
        city: 'İstanbul',
        district: 'Çekmeköy',
        neighborhood: 'Merkez',
        address: 'Merkez Mahallesi, Çekmeköy',
        netArea: 500,
        priceTL: 3500000,
        priceUSD: 120000,
        zoningStatus: 'IMARLI',
        hasElectricity: false,
        hasWater: false,
        hasGas: false,
        hasSewerage: false,
        publicTransportAccess: true,
        userId: danismanUser.id,
      },
    });

    console.log('✅ Database seeded successfully!');
    console.log(`Created ${3} users, ${2} customers, ${3} properties`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Eğer bu dosya doğrudan çalıştırılırsa seed işlemini başlat
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
