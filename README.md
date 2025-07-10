# 🌿 Plant Collector Dashboard (Electron + React)

React ve Electron.js teknolojileri kullanılarak geliştirilmiş modern bir **botanik bahçesi yönetim paneli**. Uygulama, tohum ve bitki verilerinin yönetimi, toplayıcı bilgileri, Excel’e aktarma ve offline erişim gibi birçok özelliği desteklemektedir.

## 🚀 Başlangıç

### Kurulum

# Bağımlılıkları yükle
npm install

# Geliştirme modunda başlat (React + Electron)
npm run dev

---

## 🧹 Teknolojiler

* ⚛️ React (UI)
* ⚡ Electron (Desktop uygulaması)
* 📆 Redux Toolkit (State yönetimi)
* 🗓️ LocalStorage (Offline destek)
* 📁 ExcelJS (Excel'e veri aktarımı)
* 📌 React Bootstrap (UI bileşenleri)

---

## 📊 Dashboard

Uygulamanın ana sayfası, sistemdeki bitki, tohum bankası ve toplayıcı gibi varlıkların genel özetini sunar.

<img width="935" height="682" alt="dashboard" src="https://github.com/user-attachments/assets/6bc8b982-2315-440c-bc15-541ef948dbed" />


* Toplam Bitki Sayısı
* Toplayıcılar ve Son Eklenenler
* Hızlı erişim kartları ve istatistikler

---

## 🧝 Collector (Toplayıcılar)

Toplayıcı (Collector) sayfası, bitki ya da tohum toplayan kişilerin bilgilerini içerir:

* Ad, Kod, Telefon, E-posta bilgileri
* Toplayıcı ekleme, düzenleme ve silme işlemleri

<img width="762" height="456" alt="collectors" src="https://github.com/user-attachments/assets/cd6d6919-5454-41e1-a8e6-fc29f8e83bec" />


---

## 🪴 Plant (Bitkiler)

Bitkilerle ilgili tüm bilgiler bu modülde yer alır:

* Bitki adı, türü, açıklaması, ilişkili tohum bankası
* Kategori filtreleme
* Arama, güncelleme, silme

<img width="747" height="342" alt="bitki" src="https://github.com/user-attachments/assets/2f95d80e-3f54-4847-bd76-568a67f5aa44" />



---

## ✏️ EditPlant Sayfası

Bitki düzenleme sayfası, bitkinin detaylarını sekmeler halinde düzenlemenizi sağlar:

* 📄 Genel Bilgiler
* 🌱 Kategoriler
* 🧑‍🏫 İlgili Toplayıcılar
* 📜 Açıklama

<img width="511" height="547" alt="editplant" src="https://github.com/user-attachments/assets/503735c1-9ac5-44eb-9940-70cbc79df992" />
---

## 🗂️ Electron Penceresi

Electron ile masaüstü uygulaması olarak paketlenen sistem:

* Offline erişim
* Electron BrowserWindow ile özelleştirilmiş pencere yapısı

<img width="738" height="888" alt="electron" src="https://github.com/user-attachments/assets/2b79b233-7f71-4a79-b384-cd8fb170bcad" />

---

## 💾 LocalStorage Desteği

* Son kullanılan filtreler, görünüm modları gibi ayarlar localStorage üzerinden saklanır.
* Offline kullanımda veriye erişim sağlar (geliştirme aşamasında IndexedDB opsiyonel olarak entegre edilebilir).

<img width="667" height="330" alt="localstroage" src="https://github.com/user-attachments/assets/6c9280db-2d47-4652-b50a-a6dc59461f60" />

---

## 📄 Excel Export Özelliği

Uygulamadaki veriler Excel formatında dışa aktarılabilir:

* Tohum ve bitki listeleri

<img width="1678" height="185" alt="excel" src="https://github.com/user-attachments/assets/7f48c0e5-f20e-412b-a00b-369806114b9f" />

---
