# Cleanova - Dich vu don ve sinh (Dang ky / Dang nhap voi MySQL)

Ung dung web (Node.js + Express + MySQL) cho phep nguoi dung **dang ky** (luu vao bang `Users`)
va **dang nhap** (lay du lieu tu bang `Users` de xac thuc).

Giao dien **Cleanova** (do thanh vien nhom lam) da duoc tich hop vao - ho tro 2 ngon ngu VI/EN,
co khung dang nhap, khung dang ky va khung dashboard hien thi thong tin that tu MySQL.

## 1. Yeu cau

- Node.js >= 18
- MySQL (khuyen nghi XAMPP / Laragon / MySQL 8)

## 2. Cai dat

```bash
cd dichvudonvesinh_cnpm
npm install
```

## 3. Cau hinh ket noi database

Sao chep `.env.example` thanh `.env` roi sua thong tin cho dung may cua ban:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=          # dien mat khau MySQL neu co
DB_NAME=appdondep
```

## 4. Tao database + bang

Chay 1 trong 2 cach:

**Cach A - bang script (khuyen dung):**

```bash
npm run init-db
```

**Cach B - import file SQL:** mo MySQL Workbench / phpMyAdmin va chay file `database/schema.sql`.

## 5. Chay ung dung

```bash
npm start      # hoac: npm run dev (tu dong reload)
```

Mo trinh duyet: **http://localhost:3000**

## 6. Luong hoat dong

### Dang ky  ->  `POST /api/auth/register`
1. Validate du lieu (ho ten, email, mat khau, sdt).
2. Kiem tra email da ton tai trong bang `Users` chua.
3. **Hash mat khau bang bcrypt** (`bcryptjs`).
4. `INSERT` ban ghi moi vao bang `Users` voi `role_id` = customer.
5. Luu session -> nguoi dung duoc dang nhap luon.

### Dang nhap  ->  `POST /api/auth/login`
1. Lay ban ghi trong bang `Users` theo `email`.
2. So sanh mat khau nhap vao voi hash trong DB bang `bcrypt.compare`.
3. Neu dung -> luu session va tra ve thong tin nguoi dung.
4. Neu sai -> bao loi chung chung (tranh lo tai khoan nao ton tai).

### Khac
- `GET  /api/auth/me`     - lay thong tin nguoi dang dang nhap (can session)
- `POST /api/auth/logout` - dang xuat, huy session

## 7. Cau truc thu muc

```
dichvudonvesinh_cnpm/
├── database/
│   └── schema.sql            # SQL tao database + bang
├── public/                   # Giao dien Cleanova (da tich hop backend)
│   ├── index.html            # Trang chinh: khung dang nhap + dang ky + dashboard
│   ├── style.css             # Giao dien Cleanova
│   ├── script.js             # Goi API that + doi ngon ngu VI/EN
│   ├── README-cleannova.md   # Readme goc cua thanh vien lam giao dien
│   └── cleannova-old/        # Giao dien demo cu (co the xoa)
├── src/
│   ├── db/pool.js            # ket noi MySQL (connection pool)
│   ├── db/initDb.js          # script tao database
│   ├── models/userModel.js   # truy van bang Users
│   ├── models/roleModel.js   # truy van bang Roles
│   ├── controllers/authController.js
│   ├── middleware/authMiddleware.js
│   ├── routes/authRoutes.js
│   └── server.js
├── .env.example
└── package.json
```

## 8. Luu y bao mat

- Mat khau luon duoc hash bang bcrypt (10 salt rounds), khong luu mat khau tho.
- Moi truy van dung **prepared statement** (`?`) -> chong SQL Injection.
- Session cookie dat `httpOnly: true`.
- Doi `SESSION_SECRET` trong `.env` thanh chuoi bi mat cua ban.

## 9. API cho frontend

| API | Method | Body | Tra ve |
|---|---|---|---|
| `/api/auth/register` | POST | `{ fullName, email, phone, password }` | `{ success, message, user }` |
| `/api/auth/login` | POST | `{ email, password }` | `{ success, message, user }` |
| `/api/auth/logout` | POST | - | `{ success, message }` |
| `/api/auth/me` | GET | - | `{ success, user }` |

- Loi validate tra ve `{ success: false, message, errors: { field: '...' } }` voi HTTP 400/401/409.
- Frontend (Cleanova) goi truc tiep cac API nay trong `public/script.js`.

## 10. Giao dien Cleanova da duoc chinh sua

So voi ban goc cua thanh vien:
- Them **khung dang ky** (`#register-view`) voi cac truong ho ten, email, sdt, mat khau.
- Nut "Dang ky" / "Dang nhap" chuyen qua lai giua 2 khung.
- Khung dashboard hien thi **du lieu that** (ma nguoi dung, ho ten, email, sdt, vai tro) tu MySQL.
- Bo tai khoan demo gia lap; tat ca deu goi API that.
- Them ban dich VI/EN cho toan bo chu moi.
