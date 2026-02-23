const templates = {
    student: [
        { name: "LopHoc", columns: ["MaLop INT PRIMARY KEY", "TenLop NVARCHAR(50)"] },
        { name: "SinhVien", columns: ["MaSV INT PRIMARY KEY", "HoTen NVARCHAR(100)", "NgaySinh DATE", "MaLop INT FOREIGN KEY REFERENCES LopHoc(MaLop)"] }
    ],
    sales: [
        { name: "SanPham", columns: ["MaSP INT PRIMARY KEY", "TenSP NVARCHAR(100)", "Gia DECIMAL(18,2)"] },
        { name: "DonHang", columns: ["MaDH INT PRIMARY KEY", "NgayDat DATETIME", "TongTien DECIMAL(18,2)"] }
    ]
};

function generateSQL() {
    const dbName = document.getElementById('dbName').value || "MyDatabase";
    const selectedTemplate = document.getElementById('template').value;
    const tables = templates[selectedTemplate];

    let sql = `-- Database: ${dbName}\nCREATE DATABASE ${dbName};\nGO\nUSE ${dbName};\nGO\n\n`;

    tables.forEach(table => {
        sql += `CREATE TABLE ${table.name} (\n`;
        sql += `    ${table.columns.join(",\n    ")}\n);\nGO\n\n`;
    });

    // Thêm dữ liệu mẫu INSERT INTO (Demo 1 dòng)
    sql += `-- Dữ liệu mẫu\n`;
    tables.forEach(table => {
        sql += `INSERT INTO ${table.name} VALUES (...);\n`;
    });

    document.getElementById('sqlResult').value = sql;
}

function copySQL() {
    const copyText = document.getElementById("sqlResult");
    copyText.select();
    document.execCommand("copy");
    alert("Đã sao chép SQL thành công!");
}