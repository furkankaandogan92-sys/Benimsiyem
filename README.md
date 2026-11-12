# kaanqnw.com — kişisel portfolyo

Nasdaq.live referansındaki ferah tipografi, güçlü boşluk kullanımı ve katmanlı görsel yaklaşımından ilham alan; ancak kendi kimliğine sahip koyu temalı bir kişisel web sitesi.

## Teknoloji
- React + TypeScript
- Vite
- Framer Motion
- Lucide Icons
- Responsive özel CSS

## Yerelde çalıştırma

Node.js 20 veya üzeri önerilir.

```bash
npm install
npm run dev
```

Üretim derlemesi:

```bash
npm run build
npm run preview
```

Derleme çıktısı `dist/` klasörüne alınır.

## GitHub'a yükleme

1. ZIP dosyasını aç.
2. İçindeki tüm dosyaları GitHub'da `kaanqnw.com` için oluşturduğun depoya yükle.
3. GitHub deposunda **Settings → Pages → Build and deployment → Source** bölümünden **GitHub Actions** seç.
4. İstersen aşağıdaki workflow dosyasını `.github/workflows/deploy.yml` olarak ekle.
5. `Actions` sekmesinde dağıtımın tamamlanmasını bekle.

## Özel alan adı

GitHub Pages ayarlarında **Custom domain** alanına `kaanqnw.com` yaz. DNS sağlayıcında GitHub Pages'in güncel yönergelerine göre apex domain için A/AAAA kayıtlarını, `www` için CNAME kaydını tanımla. HTTPS etkinleştir.

## Kişiselleştirme
- Tanıtım metinlerini `src/App.tsx` içinde düzenle.
- Projeleri `projects` dizisinden değiştir.
- Sosyal medya adresleri `socials` dizisinde tanımlı.
- İletişim e-postası şimdilik `hello@kaanqnw.com` olarak örneklenmiştir; gerçek adresinle değiştir.
- Kişisel biyografi ve proje detayları verilmediği için sitede doğrulanmamış başarı, unvan veya proje iddiası kullanılmadı.

## Not
Vite/React projesinin tarayıcıya açılan teknik giriş noktası `index.html` dosyasıdır. Sayfaların tasarımı ve içeriği HTML dosyalarına dağılmaz; React bileşenleri ve TypeScript ile yönetilir.
