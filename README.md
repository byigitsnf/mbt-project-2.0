# MBT Project 2.0

Modern ana muharebe tanklarını (MBT) tanıtan, hızlı ve erişilebilir bir web sitesi.
**React + Vite**, düz **CSS** ve **JavaScript** ile yazıldı. İçerik, orijinal
[MBT Project 1.4](https://github.com/byigitsnf/mbt-project)'ten alındı.

## Çalıştırma

Node.js 18 veya üstü gerekir.

```bash
npm install
npm run dev       # http://localhost:5173 adresinde geliştirme sunucusu
npm run build     # dist/ klasörüne yayınlanacak siteyi üretir
npm run preview   # derlenmiş siteyi http://localhost:4173 adresinde açar
```

`npm run dev` ve `npm run build` önce `npm run images` komutunu çalıştırır. Bu komut
`source-images/` içindeki fotoğrafları `public/img/` altına farklı boyutlarda WebP olarak yazar.
İlk çalıştırma yaklaşık 20 saniye sürer; sonraki çalıştırmalar yalnızca değişen görselleri işler.

## Klasör yapısı

```
index.html                 # Uygulamanın giriş sayfası
source-images/modernmbt/   # Modern MBT fotoğrafları (images betiğinin girdisi)
public/previews/           # About sayfasındaki animasyon (WebP)
scripts/build-images.mjs   # Duyarlı (responsive) görselleri üreten betik
src/
  main.jsx                 # Rotalar (react-router)
  data/tanks/*.json        # Her tank: ad, ülke, özet, özellikler, içerik blokları
  data/articles/*.json     # Tarih makaleleri
  data/eras.js             # Dönem seçicideki dönemler (Modern dışındakiler "work in progress")
  lib/content.js           # Verileri yükler; içindekiler ve okuma süresi hesaplar
  lib/usePage.js           # Sayfa başlığı ve sayfa değişiminde odak yönetimi
  components/              # Layout, TankCard, Img, Blocks, Toc, Breadcrumbs…
  pages/                   # Home, TankPage, ArticlePage, Fundamentals, About, NotFound
  styles/                  # global, layout, components, pages (.css)
```

### Yeni tank eklemek

1. Fotoğrafları `source-images/modernmbt/<tank-adı>/` klasörüne koyun.
2. `src/data/tanks/<tank-adı>.json` dosyasını mevcut bir tanktan kopyalayıp düzenleyin.
   Görselleri uzantısız yazın, örneğin `"heroImage": "modernmbt/altay/altay"`.
3. `introduced` alanına tankın hizmete girdiği yılı yazın. Ana sayfa tankları bu yıla göre gruplar:
   2000 ve öncesi "Remnants of the Cold War", 2001–2019 "A New Millennium", 2020 ve sonrası "Modern Warfare".
   Gruplar ve altlarındaki açıklama cümleleri `src/lib/content.js` içindeki `periods` listesinde tanımlı.
4. `blocks` alanı boşsa tank yalnızca kart olarak görünür ("Full profile coming soon").

## Yayınlama

`dist/` klasörü herhangi bir statik barındırmaya (Netlify, Vercel, GitHub Pages…) yüklenebilir.
Bu bir tek sayfalı uygulamadır (SPA): `/tanks/altay/` gibi adreslerin doğrudan açılabilmesi için
sunucunun bilinmeyen adresleri `index.html` dosyasına yönlendirmesi gerekir.

- **Netlify:** `public/_redirects` dosyasına `/* /index.html 200` satırını ekleyin.
- **GitHub Pages:** Derleme `dist/404.html` dosyasını otomatik oluşturur. Site bir alt klasörde
  yayınlanacaksa (`kullanici.github.io/mbt-project/`), `vite.config.js` içine `base: '/mbt-project/'` ekleyin.

## Erişilebilirlik

Hedef WCAG 2.2 AA'dır.

- "Ana içeriğe atla" bağlantısı, anlamsal bölgeler (`header`, `nav`, `main`, `footer`) ve atlamasız başlık sırası
- Sayfa değişince odak yeni sayfanın başlığına taşınır, böylece ekran okuyucu yeni sayfayı duyurur; sekme başlığı da güncellenir
- Geri ve ileri tuşları kaydırma konumunu geri getirir; `#bölüm` bağlantıları doğru yere atlar
- Bütün görsellerde alternatif metin, bütün form alanlarında etiket var; arama sonucu sayısı ekran okuyucuya duyurulur
- Bütün renk çiftleri en az 4.5:1 kontrastta (çoğu 7:1 ve üstü); klavye odağında görünür çerçeve; dokunma alanları en az 44 px
- Açık/koyu tema (sistem tercihi + elle geçiş). "Hareketi azalt" ayarı açıksa animasyonlar oynamaz
- Arama ve filtre adres çubuğuna yazılır (`?q=leo&country=Germany`), böylece bağlantı paylaşılabilir

## Bilinen eksikler

- Profiller yeniden yazılıyor: şu an bütün tanklar yalnızca kart olarak görünür ("Full profile coming soon").
  Eski profillerin içeriği git geçmişinde duruyor.
- Bütün içerik ilk yüklemede gelir (~135 KB gzip JS). Daha çok tank eklenirse sayfalar ayrı parçalara bölünebilir.

İçerik kamuya açık kaynaklardan derlenmiştir.
