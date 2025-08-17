# 🏠 Gayrimenkul CRM - Emlak Yönetim Sistemi

Profesyonel gayrimenkul danışmanları için kapsamlı CRM ve emlak yönetim sistemi. Müşteri takibi, portföy yönetimi, finansal işlemler ve daha fazlası.

## ✨ Özellikler

- 🔐 **Rol Tabanlı Authentication** - Admin, Danışman ve Müşteri rolleri
- 👥 **Müşteri Yönetimi** - Müşteri bilgileri, iletişim geçmişi ve tercihler
- 🏢 **Portföy Yönetimi** - Emlak portföyü, fotoğraflar ve detaylar
- 💰 **Finansal Takip** - Satış, komisyon ve gelir takibi
- 📊 **Raporlar** - Detaylı analiz ve raporlar
- 📱 **Responsive Tasarım** - Mobil uyumlu modern arayüz
- 🔄 **Real-time Updates** - Socket.IO ile gerçek zamanlı güncellemeler

## 🚀 Teknolojiler

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: SQLite (Prisma ORM)
- **Authentication**: Custom JWT-based auth
- **Real-time**: Socket.IO
- **Deployment**: Vercel ready

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/yourusername/gayrimenkul-crm.git
cd gayrimenkul-crm
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment variables oluşturun**
```bash
cp .env.example .env
```

4. **Veritabanını hazırlayın**
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 👤 Test Kullanıcıları

Sistem önceden oluşturulmuş test kullanıcıları ile gelir:

| Rol | Email | Şifre |
|-----|-------|-------|
| Admin | admin@example.com | 123456 |
| Danışman | danisman@example.com | 123456 |
| Müşteri | musteri@example.com | 123456 |

## 🏗️ Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── admin/             # Admin paneli
│   ├── dashboard/         # Ana dashboard
│   ├── login/             # Giriş sayfası
│   └── ...
├── components/            # React bileşenleri
│   ├── auth/             # Authentication bileşenleri
│   ├── layout/           # Layout bileşenleri
│   └── ui/               # UI bileşenleri
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Utility fonksiyonları
└── prisma/               # Database schema
```

## 🔧 API Endpoints

- `GET /api/health` - Sistem sağlığı kontrolü
- `POST /api/auth/login` - Kullanıcı girişi
- `GET /api/customers` - Müşteri listesi
- `POST /api/customers` - Yeni müşteri oluşturma
- `GET /api/properties` - Emlak listesi
- `POST /api/properties` - Yeni emlak oluşturma
- `GET /api/financial/stats` - Finansal istatistikler

## 🎨 Özellikler Detayı

### 🔐 Authentication & Authorization
- JWT tabanlı authentication
- Rol tabanlı erişim kontrolü (RBAC)
- Protected routes
- Session yönetimi

### 👥 Müşteri Yönetimi
- Müşteri profilleri
- İletişim geçmişi
- Tercih takibi
- Öncelik skorlama

### 🏢 Emlak Yönetimi
- Detaylı emlak bilgileri
- Fotoğraf yönetimi
- Fiyat geçmişi
- Durum takibi

### 💰 Finansal İşlemler
- Satış kayıtları
- Komisyon hesaplamaları
- Gelir raporları
- Ödeme takibi

## 🚀 Deployment

### Vercel (Önerilen)
1. GitHub repository'nizi Vercel'e bağlayın
2. Environment variables'ları ayarlayın
3. Deploy edin

### Docker
```bash
docker build -t gayrimenkul-crm .
docker run -p 3000:3000 gayrimenkul-crm
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- Proje Linki: [https://github.com/yourusername/gayrimenkul-crm](https://github.com/yourusername/gayrimenkul-crm)
- Email: your.email@example.com

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Prisma](https://www.prisma.io/) - Database ORM
- [Socket.IO](https://socket.io/) - Real-time communication

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
