const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixPublishedProperties() {
  try {
    console.log('🔧 Yayınlanmış emlakları SATISTA durumuna çeviriliyor...\n');
    
    // Yayınlanmış ama BEKLEMEDE durumundaki emlakları bul
    const publishedButNotSatista = await prisma.property.findMany({
      where: {
        isPublished: true,
        status: 'BEKLEMEDE'
      }
    });
    
    console.log(`📊 ${publishedButNotSatista.length} adet yayınlanmış emlak BEKLEMEDE durumunda`);
    
    if (publishedButNotSatista.length > 0) {
      // Bu emlakları SATISTA durumuna çevir
      const updatedProperties = await prisma.property.updateMany({
        where: {
          isPublished: true,
          status: 'BEKLEMEDE'
        },
        data: {
          status: 'SATISTA'
        }
      });
      
      console.log(`✅ ${updatedProperties.count} emlak SATISTA durumuna çevrildi`);
      
      // Kontrol et
      const nowPublishedAndSatista = await prisma.property.findMany({
        where: {
          isPublished: true,
          status: 'SATISTA'
        },
        select: {
          title: true,
          city: true,
          district: true
        }
      });
      
      console.log(`\n🎯 Şimdi ${nowPublishedAndSatista.length} adet emlak hem yayınlanmış hem SATISTA:`);
      nowPublishedAndSatista.forEach(p => {
        console.log(`  - ${p.title} (${p.city}, ${p.district})`);
      });
    } else {
      console.log('✅ Tüm yayınlanmış emlaklar zaten SATISTA durumunda');
    }
    
  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixPublishedProperties();
