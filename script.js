// Cấu hình Mermaid bản mới nhất
mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
        primaryColor: '#2563eb',
        lineColor: '#64748b',
        fontSize: '16px'
    }
});

const fakeDataPool = {
    ho: ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Phan", "Vũ", "Đặng", "Bùi"],
    lot: ["Văn", "Thị", "Anh", "Minh", "Đức", "Duy", "Hoàng", "Ngọc", "Thanh"],
    ten: ["Thực", "Hùng", "Lan", "Huệ", "Dũng", "Tuấn", "Linh", "Quân", "Thảo"],
    sach: ["Lập trình C#", "Cơ sở dữ liệu", "Học làm giàu", "Đắc Nhân Tâm", "Kỹ thuật đồ họa", "Mạng máy tính"],
    phim: ["Lật Mặt 7", "Mai", "Bố Già", "Avengers", "Oppenheimer", "Dune: Part Two"],
    loaiPhong: ["Phòng Single", "Phòng Double", "Phòng VIP", "Phòng Deluxe", "Phòng Suite"],
    domain: ["@gmail.com", "@hutech.edu.vn", "@yahoo.com"],
    phonePrefix: ["090", "091", "098", "033", "035"]
};

const dbTemplates = {
    student: {
        tables: [
            { name: "Khoa", cols: ["MaKhoa VARCHAR(10) PRIMARY KEY", "TenKhoa NVARCHAR(100)"], erd: "Khoa ||--o{ Lop : co" },
            { name: "Lop", cols: ["MaLop VARCHAR(10) PRIMARY KEY", "TenLop NVARCHAR(50)", "MaKhoa VARCHAR(10) REFERENCES Khoa(MaKhoa)"], erd: "Lop ||--o{ SinhVien : thuoc" },
            { name: "SinhVien", cols: ["MaSV INT PRIMARY KEY", "HoTen NVARCHAR(100)", "Email VARCHAR(50)", "MaLop VARCHAR(10) REFERENCES Lop(MaLop)"], erd: "" }
        ],
        seed: [
            { table: "Khoa", vals: ["('CNTT', N'Công nghệ thông tin')", "('KT', N'Kế toán')"] },
            { table: "Lop", vals: ["('L01', '21DTH01', 'CNTT')", "('L02', '21DTH02', 'CNTT')"] }
        ]
    },
    sales: {
        tables: [
            { name: "Product", cols: ["ID INT PRIMARY KEY", "Name NVARCHAR(200)", "Price DECIMAL(18,2)"], erd: "Product ||--o{ Order_Detail : includes" },
            { name: "Orders", cols: ["OrderID INT PRIMARY KEY", "OrderDate DATETIME", "CustomerName NVARCHAR(100)"], erd: "Orders ||--o{ Order_Detail : has" },
            { name: "Order_Detail", cols: ["ID INT PRIMARY KEY", "OrderID INT REFERENCES Orders(OrderID)", "ProductID INT REFERENCES Product(ID)"], erd: "" }
        ],
        seed: [
            { table: "Product", vals: ["(1, N'iPhone 15 Pro', 28000000)", "(2, N'Macbook M3', 42000000)"] },
            { table: "Orders", vals: ["(101, GETDATE(), N'Nguyễn Văn Thực')"] }
        ]
    },
    library: {
        tables: [
            { name: "TacGia", cols: ["MaTG VARCHAR(10) PRIMARY KEY", "TenTG NVARCHAR(100)"], erd: "TacGia ||--o{ Sach : viet" },
            { name: "Sach", cols: ["MaSach VARCHAR(10) PRIMARY KEY", "TenSach NVARCHAR(200)", "MaTG VARCHAR(10) REFERENCES TacGia(MaTG)"], erd: "Sach ||--o{ PhieuMuon : duoc_muon" },
            { name: "DocGia", cols: ["MaDG VARCHAR(10) PRIMARY KEY", "HoTen NVARCHAR(100)", "SDT VARCHAR(15)"], erd: "DocGia ||--o{ PhieuMuon : lap" },
            { name: "PhieuMuon", cols: ["MaPM INT PRIMARY KEY", "MaSach VARCHAR(10) REFERENCES Sach(MaSach)", "MaDG VARCHAR(10) REFERENCES DocGia(MaDG)", "NgayMuon DATE"], erd: "" }
        ],
        seed: [
            { table: "TacGia", vals: ["('TG01', N'Nam Cao')", "('TG02', N'Tô Hoài')"] },
            { table: "Sach", vals: ["('S01', N'Chí Phèo', 'TG01')", "('S02', N'Dế Mèn Phiêu Lưu Ký', 'TG02')"] }
        ]
    },
    cinema: {
        tables: [
            { name: "Phim", cols: ["MaPhim VARCHAR(10) PRIMARY KEY", "TenPhim NVARCHAR(200)", "ThoiLuong INT"], erd: "Phim ||--o{ SuatChieu : co" },
            { name: "PhongChieu", cols: ["MaPhong VARCHAR(10) PRIMARY KEY", "TenPhong NVARCHAR(50)"], erd: "PhongChieu ||--o{ SuatChieu : chua" },
            { name: "SuatChieu", cols: ["MaSuat INT PRIMARY KEY", "MaPhim VARCHAR(10) REFERENCES Phim(MaPhim)", "MaPhong VARCHAR(10) REFERENCES PhongChieu(MaPhong)", "GioBatDau DATETIME"], erd: "SuatChieu ||--o{ Ve : thuoc" },
            { name: "Ve", cols: ["MaVe INT PRIMARY KEY", "MaSuat INT REFERENCES SuatChieu(MaSuat)", "GiaVe DECIMAL"], erd: "" }
        ],
        seed: [
            { table: "Phim", vals: ["('P01', N'Lật Mặt 7', 120)", "('P02', N'Mai', 130)"] },
            { table: "PhongChieu", vals: ["('PC01', N'Phòng 01 (IMAX)')", "('PC02', N'Phòng 02')"] }
        ]
    },
    hotel: {
        tables: [
            { name: "LoaiPhong", cols: ["MaLP VARCHAR(10) PRIMARY KEY", "TenLoai NVARCHAR(50)", "GiaNgay DECIMAL"], erd: "LoaiPhong ||--o{ Phong : gom" },
            { name: "Phong", cols: ["MaPhong VARCHAR(10) PRIMARY KEY", "MaLP VARCHAR(10) REFERENCES LoaiPhong(MaLP)", "TrangThai NVARCHAR(20)"], erd: "Phong ||--o{ DatPhong : duoc_dat" },
            { name: "KhachHang", cols: ["MaKH VARCHAR(10) PRIMARY KEY", "HoTen NVARCHAR(100)", "CCCD VARCHAR(20)"], erd: "KhachHang ||--o{ DatPhong : thuc_hien" },
            { name: "DatPhong", cols: ["MaDP INT PRIMARY KEY", "MaKH VARCHAR(10) REFERENCES KhachHang(MaKH)", "MaPhong VARCHAR(10) REFERENCES Phong(MaPhong)", "NgayDen DATE"], erd: "" }
        ],
        seed: [
            { table: "LoaiPhong", vals: ["('LP01', N'Phòng Single', 500000)", "('LP02', N'Phòng VIP', 1500000)"] },
            { table: "KhachHang", vals: ["('KH01', N'Nguyễn Văn Thực', '0123456789')"] }
        ]
    }
};

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
let pendingErdMarkup = '';
let myProject = [];
let currentTemplateKey = 'student';
let autoGenerateTimer = null;
let isGenerating = false;
let currentEditingErdRelations = [];

const LOCAL_PROJECTS_KEY = 'db_helper_projects_v2';

function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function loadProjectStore() {
    try {
        const raw = localStorage.getItem(LOCAL_PROJECTS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveProjectStore(store) {
    localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(store));
}

function getDefaultTables(templateKey) {
    const template = dbTemplates[templateKey];
    return template ? deepClone(template.tables) : [];
}

function normalizeColumnEntry(column, index) {
    if (typeof column === 'string') return column.trim();

    if (column && typeof column === 'object') {
        if (typeof column.raw === 'string' && column.raw.trim()) return column.raw.trim();

        const name = String(column.name || column.column || column.field || `Col_${index + 1}`).trim();
        const sqlType = String(column.type || column.sqlType || 'VARCHAR(100)').trim();
        let colDef = `${name} ${sqlType}`;

        if (column.primaryKey || column.isPrimary) colDef += ' PRIMARY KEY';
        if (column.autoIncrement || column.identity) colDef += ' IDENTITY(1,1)';
        if (column.notNull === true || column.nullable === false) colDef += ' NOT NULL';

        const refTable = column.referenceTable || column.refTable || column.references?.table;
        const refColumn = column.referenceColumn || column.refColumn || column.references?.column || 'ID';
        if (refTable) colDef += ` REFERENCES ${refTable}(${refColumn})`;

        return colDef.trim();
    }

    return String(column || '').trim();
}

function normalizeTable(table, index) {
    const safeName = String(table?.name || `Table_${index + 1}`).trim() || `Table_${index + 1}`;
    const safeCols = Array.isArray(table?.cols)
        ? table.cols.map((col, colIndex) => normalizeColumnEntry(col, colIndex)).filter(Boolean)
        : [];
    return {
        name: safeName,
        cols: safeCols.length ? safeCols : ['ID INT PRIMARY KEY'],
        erd: String(table?.erd || '').trim()
    };
}

function escapeRegex(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function canonicalTableName(name) {
    return String(name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace(/\d+$/, '');
}

function replaceReferenceTableName(colDef, oldName, newName) {
    if (!oldName || !newName || oldName === newName) return colDef;
    const pattern = new RegExp(`(\\bREFERENCES\\s+)${escapeRegex(oldName)}(\\s*\\()`, 'gi');
    return String(colDef).replace(pattern, `$1${newName}$2`);
}

function replaceNameInErd(erdText, oldName, newName) {
    if (!oldName || !newName || oldName === newName) return erdText;
    const pattern = new RegExp(`(^|[^A-Za-z0-9_])${escapeRegex(oldName)}(?=[^A-Za-z0-9_]|$)`, 'g');
    return String(erdText).replace(pattern, `$1${newName}`);
}

function propagateTableRename(oldName, newName, exceptIndex) {
    myProject = myProject.map((table, idx) => {
        if (idx === exceptIndex) return table;

        const updatedCols = table.cols.map(col => replaceReferenceTableName(col, oldName, newName));
        const updatedErd = replaceNameInErd(table.erd || '', oldName, newName);

        return {
            ...table,
            cols: updatedCols,
            erd: updatedErd
        };
    });
}

function repairProjectReferences() {
    if (!myProject.length) return;

    const tableNames = new Set(myProject.map(t => t.name));
    const nameList = [...tableNames];

    myProject = myProject.map(table => {
        const repairedCols = table.cols.map(col => {
            const refMatch = String(col).match(/\bREFERENCES\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/i);
            if (!refMatch) return col;

            const refTable = refMatch[1];
            if (tableNames.has(refTable)) return col;

            const refCanonical = canonicalTableName(refTable);
            const candidates = nameList.filter(name => canonicalTableName(name) === refCanonical);
            if (candidates.length === 1) {
                return replaceReferenceTableName(col, refTable, candidates[0]);
            }

            return col;
        });

        return {
            ...table,
            cols: repairedCols
        };
    });
}

function initProjectForTemplate(templateKey) {
    currentTemplateKey = templateKey;
    const store = loadProjectStore();
    const savedTables = Array.isArray(store[templateKey]) ? store[templateKey] : null;
    const sourceTables = savedTables && savedTables.length ? savedTables : getDefaultTables(templateKey);
    myProject = sourceTables.map(normalizeTable);
    repairProjectReferences();
    renderTableList();
}

function persistCurrentProject() {
    const store = loadProjectStore();
    store[currentTemplateKey] = myProject.map(normalizeTable);
    saveProjectStore(store);
    renderTableList();
    scheduleGenerate(120);
}

function scheduleGenerate(delay = 320) {
    if (autoGenerateTimer) clearTimeout(autoGenerateTimer);
    autoGenerateTimer = setTimeout(() => {
        autoGenerateTimer = null;
        triggerGenerate();
    }, delay);
}

async function triggerGenerate() {
    if (isGenerating) return;
    isGenerating = true;
    try {
        await handleGenerate();
    } finally {
        isGenerating = false;
    }
}

function renderTableList() {
    const list = document.getElementById('tableList');
    if (!list) return;

    if (!myProject.length) {
        list.innerHTML = '<div class="text-muted small">Chưa có bảng nào.</div>';
        return;
    }

    list.innerHTML = myProject.map((table, index) => `
        <div class="d-flex justify-content-between align-items-center mb-2 p-2 border rounded bg-light">
            <span class="fw-bold small">${table.name}</span>
            <div>
                <button onclick="openEditModal(${index})" class="btn btn-sm text-primary"><i class="fas fa-edit"></i></button>
                <button onclick="deleteTable(${index})" class="btn btn-sm text-danger"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function addNewTable() {
    const newTable = {
        name: `BangMoi_${myProject.length + 1}`,
        cols: ['ID INT PRIMARY KEY', 'Ten NVARCHAR(100)'],
        erd: ''
    };
    myProject.push(newTable);
    persistCurrentProject();
    openEditModal(myProject.length - 1);
}

function openEditModal(index) {
    const table = myProject[index];
    if (!table) return;

    document.getElementById('editTableIndex').value = String(index);
    document.getElementById('editTableName').value = table.name;
    document.getElementById('editTableCols').value = table.cols.join('\n');

    // Parse ERD string thành danh sách quan hệ
    currentEditingErdRelations = parseErdString(table.erd || '');

    // Populate dropdown với danh sách bảng khác
    const tableNames = myProject.map(t => t.name);
    const parentSelect = document.getElementById('erdParentTable');
    const childSelect = document.getElementById('erdChildTable');
    
    parentSelect.innerHTML = '<option value="">Bảng cha</option>';
    childSelect.innerHTML = '<option value="">Bảng con</option>';
    
    tableNames.forEach(name => {
        if (name !== table.name) {
            parentSelect.innerHTML += `<option value="${name}">${name}</option>`;
            childSelect.innerHTML += `<option value="${name}">${name}</option>`;
        }
    });

    // Reset form ERD
    document.getElementById('erdParentTable').value = '';
    document.getElementById('erdRelationType').value = '||--o{';
    document.getElementById('erdChildTable').value = '';
    document.getElementById('erdLabel').value = '';

    // Render danh sách quan hệ hiện tại
    renderErdRelationsList();

    new bootstrap.Modal(document.getElementById('editTableModal')).show();
}

function saveTableChanges() {
    const index = Number(document.getElementById('editTableIndex').value);
    if (!Number.isInteger(index) || index < 0 || index >= myProject.length) return;

    const oldName = myProject[index].name;
    const name = document.getElementById('editTableName').value.trim();
    const cols = document.getElementById('editTableCols').value
        .split('\n')
        .map(c => c.trim())
        .filter(Boolean);
    
    // Convert danh sách quan hệ thành chuỗi ERD
    const erd = buildErdString(currentEditingErdRelations);

    myProject[index] = normalizeTable({ name: name || myProject[index].name, cols, erd }, index);
    const newName = myProject[index].name;
    if (newName !== oldName) {
        propagateTableRename(oldName, newName, index);
    }

    persistCurrentProject();

    const modalEl = document.getElementById('editTableModal');
    const instance = bootstrap.Modal.getInstance(modalEl);
    if (instance) instance.hide();
}

function deleteTable(index) {
    if (!myProject[index]) return;
    if (!confirm(`Xóa bảng ${myProject[index].name}?`)) return;
    myProject.splice(index, 1);
    persistCurrentProject();
}

function resetToDefault() {
    if (!confirm('Reset về mẫu gốc cho template hiện tại?')) return;
    const store = loadProjectStore();
    delete store[currentTemplateKey];
    saveProjectStore(store);
    initProjectForTemplate(currentTemplateKey);
    scheduleGenerate(80);
}

// Helper functions cho ERD Editor
function parseErdString(erdStr) {
    // Phân tích chuỗi ERD: "Table1 ||--o{ Table2 : label" hoặc "Table1 ||--o{ Table2"
    const relations = [];
    if (!erdStr) return relations;
    
    // Regex để match: tableName relationSymbol tableName : label (hoặc không có label)
    const relationRegex = /(\w+)\s*([\|\-\{\}]+)\s*(\w+)(?:\s*:\s*([^|]+?))?(?=\s*$|(?=\w+\s*[\|\-]))/g;
    let match;
    
    while ((match = relationRegex.exec(erdStr)) !== null) {
        relations.push({
            parent: match[1],
            type: match[2],
            child: match[3],
            label: match[4] ? match[4].trim() : ''
        });
    }
    return relations;
}

function buildErdString(relations) {
    if (!relations || relations.length === 0) return '';
    return relations.map(r => {
        const relStr = `${r.parent} ${r.type} ${r.child}`;
        return r.label ? `${relStr} : ${r.label}` : relStr;
    }).join(' ');
}

function addErdRelation() {
    const parent = document.getElementById('erdParentTable').value.trim();
    const type = document.getElementById('erdRelationType').value.trim();
    const child = document.getElementById('erdChildTable').value.trim();
    const label = document.getElementById('erdLabel').value.trim();
    
    if (!parent || !child) {
        alert('Vui lòng chọn cả bảng cha và bảng con');
        return;
    }
    
    if (parent === child) {
        alert('Bảng cha và bảng con không được trùng nhau');
        return;
    }
    
    // Kiểm tra trùng lặp
    if (currentEditingErdRelations.some(r => r.parent === parent && r.child === child)) {
        alert('Quan hệ này đã tồn tại');
        return;
    }
    
    currentEditingErdRelations.push({ parent, type, child, label });
    
    // Clear form
    document.getElementById('erdParentTable').value = '';
    document.getElementById('erdRelationType').value = '||--o{';
    document.getElementById('erdChildTable').value = '';
    document.getElementById('erdLabel').value = '';
    
    renderErdRelationsList();
}

function removeErdRelation(index) {
    if (index >= 0 && index < currentEditingErdRelations.length) {
        currentEditingErdRelations.splice(index, 1);
        renderErdRelationsList();
    }
}

function renderErdRelationsList() {
    const container = document.getElementById('erdRelationsList');
    if (!currentEditingErdRelations || currentEditingErdRelations.length === 0) {
        container.innerHTML = '<div class="text-muted">Chưa có quan hệ nào</div>';
        return;
    }
    
    let html = '<div class="text-muted small mb-2">Danh sách quan hệ:</div>';
    currentEditingErdRelations.forEach((rel, idx) => {
        const label = rel.label ? ` : ${rel.label}` : '';
        const typeDisplay = rel.type === '||--||' ? '1-1' : 
                           rel.type === '||--o{' ? '1-n' : 
                           rel.type === '}o--||' ? 'n-1' : 'n-n';
        html += `
            <div class="d-flex justify-content-between align-items-center border-top pt-2 mt-2">
                <span class="small"><strong>${rel.parent}</strong> <span class="text-muted">${typeDisplay}</span> <strong>${rel.child}</strong>${label}</span>
                <button type="button" onclick="removeErdRelation(${idx})" class="btn btn-sm btn-outline-danger">Xóa</button>
            </div>
        `;
    });
    container.innerHTML = html;
}

function downloadJsonObject(data, fileName) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
}

function exportSchemaOnly() {
    const dbName = document.getElementById('dbName').value || 'project';
    const fileName = `${dbName}_${currentTemplateKey}_schema.json`;
    const schemaOnly = myProject.map(normalizeTable);
    downloadJsonObject(schemaOnly, fileName);
}

function exportFullProject() {
    const dbName = document.getElementById('dbName').value || 'project';
    const payload = {
        version: 2,
        kind: 'db-student-helper-full-project',
        metadata: {
            exportedAt: new Date().toISOString(),
            template: currentTemplateKey,
            dbName,
            dbType: document.getElementById('dbType').value,
            rowCount: parseInt(document.getElementById('rowCount').value) || 10
        },
        tables: myProject.map(normalizeTable)
    };

    const fileName = `${dbName}_${currentTemplateKey}_full-project.json`;
    downloadJsonObject(payload, fileName);
}

function exportProject() {
    exportFullProject();
}

function importProject(event) {
    const fileInput = event.target;
    const file = fileInput.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const raw = JSON.parse(e.target.result);
            const importedTables = Array.isArray(raw)
                ? raw
                : Array.isArray(raw?.tables)
                    ? raw.tables
                    : Array.isArray(raw?.schema)
                        ? raw.schema
                    : null;

            if (!importedTables || !importedTables.length) {
                alert('File JSON không hợp lệ hoặc không có bảng.');
                fileInput.value = '';
                return;
            }

            const meta = raw?.metadata || null;
            const importedTemplate = meta?.template;
            const templateSelect = document.getElementById('template');
            if (importedTemplate && templateSelect) {
                const hasTemplate = [...templateSelect.options].some(option => option.value === importedTemplate);
                if (hasTemplate) {
                    templateSelect.value = importedTemplate;
                    currentTemplateKey = importedTemplate;
                }
            }

            if (meta?.dbName) {
                document.getElementById('dbName').value = String(meta.dbName);
            }
            if (meta?.dbType) {
                const dbTypeSelect = document.getElementById('dbType');
                const hasDbType = [...dbTypeSelect.options].some(option => option.value === meta.dbType);
                if (hasDbType) dbTypeSelect.value = meta.dbType;
            }
            if (meta?.rowCount !== undefined) {
                const rowCount = Number(meta.rowCount);
                if (Number.isFinite(rowCount) && rowCount > 0) {
                    document.getElementById('rowCount').value = String(Math.floor(rowCount));
                }
            }

            myProject = importedTables.map(normalizeTable);
            repairProjectReferences();
            persistCurrentProject();
            scheduleGenerate(80);
            const fallbackColumns = collectFallbackColumns(myProject);
            alert(buildFallbackImportMessage(fallbackColumns));
        } catch {
            alert('File không hợp lệ!');
        } finally {
            fileInput.value = '';
        }
    };

    reader.readAsText(file, 'utf-8');
}

function parseColumnDef(colDef) {
    const text = String(colDef || '').trim();
    const nameMatch = text.match(/^([A-Za-z_][A-Za-z0-9_]*)/);
    const typeMatch = text.match(/^([A-Za-z_][A-Za-z0-9_]*)\s+([A-Za-z]+(?:\([^\)]*\))?)/i);
    const refMatch = text.match(/\bREFERENCES\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)/i);

    return {
        raw: text,
        name: nameMatch ? nameMatch[1] : 'Column',
        sqlType: typeMatch ? typeMatch[2].toUpperCase() : 'VARCHAR(100)',
        isPrimary: /\bPRIMARY\s+KEY\b/i.test(text),
        referenceTable: refMatch ? refMatch[1] : null,
        referenceColumn: refMatch ? refMatch[2] : null
    };
}

function buildTableOrder(tableMetas) {
    const tableNames = new Set(tableMetas.map(m => m.name));
    const indegree = new Map(tableMetas.map(m => [m.name, 0]));
    const graph = new Map(tableMetas.map(m => [m.name, []]));

    tableMetas.forEach(meta => {
        const deps = new Set(
            meta.columns
                .map(col => col.referenceTable)
                .filter(ref => ref && tableNames.has(ref) && ref !== meta.name)
        );
        deps.forEach(dep => {
            graph.get(dep).push(meta.name);
            indegree.set(meta.name, (indegree.get(meta.name) || 0) + 1);
        });
    });

    const queue = tableMetas.filter(m => indegree.get(m.name) === 0).map(m => m.name);
    const ordered = [];

    while (queue.length) {
        const current = queue.shift();
        ordered.push(current);
        (graph.get(current) || []).forEach(next => {
            indegree.set(next, (indegree.get(next) || 0) - 1);
            if (indegree.get(next) === 0) queue.push(next);
        });
    }

    if (ordered.length !== tableMetas.length) {
        const missing = tableMetas.map(m => m.name).filter(name => !ordered.includes(name));
        ordered.push(...missing);
    }

    return ordered;
}

function sqlEscape(value) {
    return String(value).replace(/'/g, "''");
}

function isStringType(sqlType) {
    return /(CHAR|TEXT|NCHAR|NVARCHAR|VARCHAR)/i.test(sqlType);
}

function isDateType(sqlType) {
    return /(DATE|TIME)/i.test(sqlType);
}

function isBooleanType(sqlType) {
    return /(BIT|BOOL|BOOLEAN)/i.test(sqlType);
}

function isNumberType(sqlType) {
    return /(INT|DECIMAL|NUMERIC|FLOAT|REAL|DOUBLE|MONEY)/i.test(sqlType);
}

function formatSqlValue(raw, sqlType) {
    if (raw === null || raw === undefined) return 'NULL';
    if (isBooleanType(sqlType)) return Number(raw) ? '1' : '0';
    if (isNumberType(sqlType)) return String(Number(raw));
    if (isDateType(sqlType)) return `'${sqlEscape(raw)}'`;
    return `'${sqlEscape(raw)}'`;
}

function randomFullName() {
    return `${random(fakeDataPool.ho)} ${random(fakeDataPool.lot)} ${random(fakeDataPool.ten)}`;
}

function getNameMappingType(columnName) {
    const lower = String(columnName || '').toLowerCase();

    if (lower === 'ho' || lower.includes('lastname') || lower.includes('last_name')) return 'last_name';
    if (lower === 'lot' || lower.includes('middlename') || lower.includes('middle_name')) return 'middle_name';
    if (lower === 'ten' || lower.includes('firstname') || lower.includes('first_name')) return 'first_name';
    if (lower.includes('email')) return 'email';
    if (lower.includes('sdt') || lower.includes('phone') || lower.includes('dien_thoai')) return 'phone';
    if (lower.includes('ten') || lower.includes('hoten') || lower.includes('name')) return 'full_name';
    if (lower.includes('phim')) return 'movie';
    if (lower.includes('sach')) return 'book';
    if (lower.includes('loaiphong') || lower.includes('loai_phong')) return 'room_type';

    return 'fallback';
}

function randomByColumnName(columnName, rowIndex = 1) {
    const mapping = getNameMappingType(columnName);

    if (mapping === 'last_name') return random(fakeDataPool.ho);
    if (mapping === 'middle_name') return random(fakeDataPool.lot);
    if (mapping === 'first_name') return random(fakeDataPool.ten);
    if (mapping === 'email') {
        const name = randomFullName().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '').toLowerCase();
        return `${name}${Math.floor(100 + Math.random() * 900)}${random(fakeDataPool.domain)}`;
    }
    if (mapping === 'phone') return `${random(fakeDataPool.phonePrefix)}${Math.floor(1000000 + Math.random() * 9000000)}`;
    if (mapping === 'full_name') return randomFullName();
    if (mapping === 'movie') return random(fakeDataPool.phim);
    if (mapping === 'book') return random(fakeDataPool.sach);
    if (mapping === 'room_type') return random(fakeDataPool.loaiPhong);

    return `${columnName}_Data_${rowIndex}`;
}

function isFallbackColumn(column) {
    if (column.referenceTable || column.isPrimary) return false;
    if (isBooleanType(column.sqlType) || /(gioitinh|gender|trangthai|status|is_|has_|active|enabled)/i.test(column.name)) return false;
    if (isNumberType(column.sqlType)) return false;
    if (isDateType(column.sqlType)) return false;
    if (isStringType(column.sqlType) || !column.sqlType) return getNameMappingType(column.name) === 'fallback';
    return true;
}

function collectFallbackColumns(tables) {
    const fallbackItems = [];

    tables.forEach(table => {
        const cols = Array.isArray(table?.cols) ? table.cols : [];
        cols.forEach(colRaw => {
            const col = parseColumnDef(colRaw);
            if (isFallbackColumn(col)) {
                fallbackItems.push({
                    table: table.name,
                    column: col.name,
                    sqlType: col.sqlType || 'UNKNOWN'
                });
            }
        });
    });

    return fallbackItems;
}

function buildFallbackImportMessage(fallbackItems) {
    if (!fallbackItems.length) {
        return 'Nhập dự án thành công!\nKhông có cột nào dùng fallback.';
    }

    const maxLines = 15;
    const lines = fallbackItems.slice(0, maxLines).map(item => `- ${item.table}.${item.column} [${item.sqlType}]`);
    const remain = fallbackItems.length - maxLines;

    return [
        `Nhập dự án thành công!`,
        `Có ${fallbackItems.length} cột đang dùng fallback:`,
        ...lines,
        ...(remain > 0 ? [`... và ${remain} cột khác.`] : []),
        'Mẹo: đổi tên cột rõ nghĩa hoặc chỉnh mapping để sinh dữ liệu sát hơn.'
    ].join('\n');
}

function buildPkValue(tableName, column, rowIndex, runKey, tableOffset) {
    if (isNumberType(column.sqlType)) return runKey * 1000 + tableOffset * 100 + rowIndex;
    const prefix = sanitizeEntityName(tableName).slice(0, 4).toUpperCase();
    return `${prefix}${String(runKey).slice(-4)}${String(rowIndex).padStart(3, '0')}`;
}

function buildColumnValue({ tableMeta, column, rowIndex, runKey, tableOffset, generatedPkValues }) {
    if (column.referenceTable && generatedPkValues[column.referenceTable]?.length) {
        return random(generatedPkValues[column.referenceTable]);
    }

    if (column.isPrimary) {
        return buildPkValue(tableMeta.name, column, rowIndex, runKey, tableOffset);
    }

    if (isBooleanType(column.sqlType) || /(gioitinh|gender|trangthai|status|is_|has_|active|enabled)/i.test(column.name)) {
        return rowIndex % 2 === 0 ? 1 : 0;
    }

    if (isNumberType(column.sqlType)) {
        if (/gia|price|cost|amount/i.test(column.name)) return random([45000, 75000, 120000, 28000000, 42000000]);
        if (/diem|gpa|score|point|rating/i.test(column.name)) return Number((Math.random() * 4 + 6).toFixed(1));
        if (/luong|salary|wage|income/i.test(column.name)) return random([8000000, 12000000, 18000000, 25000000]);
        if (/cannang|can_nang|weight/i.test(column.name)) return Number((Math.random() * 40 + 45).toFixed(1));
        if (/chieucao|chieu_cao|height/i.test(column.name)) return Number((Math.random() * 40 + 150).toFixed(1));
        return runKey * 100 + tableOffset * 10 + rowIndex;
    }

    if (isDateType(column.sqlType)) {
        const day = String((rowIndex % 28) + 1).padStart(2, '0');
        return `2026-02-${day}`;
    }

    if (isStringType(column.sqlType) || !column.sqlType) {
        return randomByColumnName(column.name, rowIndex);
    }

    return `${column.name}_Data_${rowIndex}`;
}

function generateProjectData(tables, count) {
    const runKey = Date.now() % 1000000;
    let sqlData = `\n-- RunKey: ${runKey}\n-- SINH NGẪU NHIÊN ${count} DỮ LIỆU THỰC TẾ\n`;

    const tableMetas = tables.map((table, index) => ({
        ...table,
        tableIndex: index,
        columns: table.cols.map(parseColumnDef)
    }));

    const order = buildTableOrder(tableMetas);
    const generatedPkValues = {};

    order.forEach((tableName, orderedIndex) => {
        const tableMeta = tableMetas.find(m => m.name === tableName);
        if (!tableMeta || !tableMeta.columns.length) return;

        generatedPkValues[tableMeta.name] = generatedPkValues[tableMeta.name] || [];
        const primaryCol = tableMeta.columns.find(c => c.isPrimary) || null;

        for (let rowIndex = 1; rowIndex <= count; rowIndex++) {
            const rawValues = tableMeta.columns.map(column => buildColumnValue({
                tableMeta,
                column,
                rowIndex,
                runKey,
                tableOffset: orderedIndex + 1,
                generatedPkValues
            }));

            if (primaryCol) {
                const pkIndex = tableMeta.columns.findIndex(c => c.name === primaryCol.name);
                generatedPkValues[tableMeta.name].push(rawValues[pkIndex]);
            }

            const sqlValues = rawValues.map((value, idx) => formatSqlValue(value, tableMeta.columns[idx].sqlType));
            sqlData += `INSERT INTO ${tableMeta.name} VALUES (${sqlValues.join(', ')});\n`;
        }
    });

    return sqlData;
}

function sanitizeEntityName(name) {
    const clean = String(name || '')
        .replace(/[^A-Za-z0-9]/g, '_')
        .replace(/^_+|_+$/g, '');
    const normalized = clean || 'Entity';
    return /^\d/.test(normalized) ? `T_${normalized}` : normalized;
}

function extractColumnName(colDef) {
    const match = String(colDef).trim().match(/^([A-Za-z_][A-Za-z0-9_]*)/);
    return match ? match[1] : 'column';
}

function buildMermaidERD(template) {
    const tableMap = new Map(template.tables.map(t => [t.name, sanitizeEntityName(t.name)]));
    const relationSet = new Set();
    let markup = 'erDiagram\n';

    template.tables.forEach(table => {
        const entity = tableMap.get(table.name);
        markup += `    ${entity} {\n`;

        table.cols.forEach(col => {
            const colName = extractColumnName(col);
            const flags = [];
            if (/\bPRIMARY\s+KEY\b/i.test(col)) flags.push('PK');
            if (/\bREFERENCES\b/i.test(col)) flags.push('FK');

            const suffix = flags.length ? ` ${flags.join(',')}` : '';
            markup += `        string ${colName}${suffix}\n`;

            const refMatch = String(col).match(/\bREFERENCES\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/i);
            if (refMatch) {
                const parentTable = refMatch[1];
                if (!tableMap.has(parentTable)) return;
                const parentEntity = tableMap.get(parentTable);
                relationSet.add(`    ${parentEntity} ||--o{ ${entity} : has`);
            }
        });

        markup += '    }\n';
    });

    if (relationSet.size > 0) {
        markup += '\n' + [...relationSet].join('\n') + '\n';
    }

    return markup;
}

function isErdPanelVisible() {
    const panel = document.getElementById('erdPanel');
    return !!panel && panel.classList.contains('show') && panel.classList.contains('active');
}

async function renderMermaidWhenVisible(erdMarkup) {
    const container = document.getElementById('mermaidContainer');
    if (!container) return;

    try {
        container.innerHTML = `<pre class="mermaid">${erdMarkup}</pre>`;
        await mermaid.run({
            nodes: container.querySelectorAll('.mermaid'),
        });
        pendingErdMarkup = '';
    } catch (error) {
        container.innerHTML = `<div class="text-danger fw-bold">Lỗi Mermaid: ${error?.message || 'Syntax error in text'}</div>`;
    }
}

async function handleGenerate() {
    const dbName = document.getElementById('dbName').value || "MY_DATABASE";
    const type = document.getElementById('dbType').value;
    const tempKey = document.getElementById('template').value;
    const rowCount = parseInt(document.getElementById('rowCount').value) || 10;

    if (!myProject.length || currentTemplateKey !== tempKey) {
        initProjectForTemplate(tempKey);
    }

    // 1. SINH SQL
    let sql = `-- HỆ QUẢN TRỊ: ${type}\nCREATE DATABASE ${dbName};\nGO\nUSE ${dbName};\nGO\n\n`;
    
    myProject.forEach(t => {
        sql += `CREATE TABLE ${t.name} (\n  ${t.cols.join(",\n  ")}\n);\nGO\n\n`;
    });

    const bulkData = generateProjectData(myProject, rowCount);
    document.getElementById('sqlResult').innerText = sql + bulkData;

    // 2. SINH ERD
    const erdMarkup = buildMermaidERD({ tables: myProject });

    if (isErdPanelVisible()) {
        await renderMermaidWhenVisible(erdMarkup);
    } else {
        pendingErdMarkup = erdMarkup;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dbNameInput = document.getElementById('dbName');
    const dbTypeSelect = document.getElementById('dbType');
    const rowCountInput = document.getElementById('rowCount');
    const templateSelect = document.getElementById('template');
    const initialTemplate = templateSelect ? templateSelect.value : 'student';
    initProjectForTemplate(initialTemplate);

    [dbNameInput, rowCountInput].forEach(el => {
        if (!el) return;
        el.addEventListener('input', () => scheduleGenerate());
    });

    if (dbTypeSelect) {
        dbTypeSelect.addEventListener('change', () => scheduleGenerate());
    }

    if (templateSelect) {
        templateSelect.addEventListener('change', (event) => {
            const newTemplateKey = event.target.value;
            initProjectForTemplate(newTemplateKey);
            pendingErdMarkup = '';
            document.getElementById('mermaidContainer').innerHTML = '';
            scheduleGenerate(80);
        });
    }

    const erdTabButton = document.querySelector('[data-bs-target="#erdPanel"]');
    if (!erdTabButton) return;

    erdTabButton.addEventListener('shown.bs.tab', () => {
        if (!pendingErdMarkup) return;
        setTimeout(() => {
            renderMermaidWhenVisible(pendingErdMarkup);
        }, 50);
    });

    scheduleGenerate(80);
});

function copySQL() {
    const text = document.getElementById('sqlResult').innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('btnCopy');
        btn.innerHTML = '<i class="fas fa-check"></i> Đã Copy!';
        btn.classList.replace('btn-outline-secondary', 'btn-success');
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i> Copy SQL';
            btn.classList.replace('btn-success', 'btn-outline-secondary');
        }, 2000);
    });
}

function downloadSQL() {
    const text = document.getElementById('sqlResult').innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = document.getElementById('dbName').value + ".sql";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
}

function downloadERDPng() {
    const container = document.getElementById('mermaidContainer');
    const svg = container ? container.querySelector('svg') : null;

    if (!svg) {
        alert('Chưa có sơ đồ ERD để xuất ảnh. Hãy bấm "SINH SQL & ERD" trước.');
        return;
    }

    const svgClone = svg.cloneNode(true);
    const bbox = svg.getBBox();
    const width = Math.max(1, Math.ceil((bbox.width || svg.clientWidth || 1200) + 40));
    const height = Math.max(1, Math.ceil((bbox.height || svg.clientHeight || 800) + 40));

    svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgClone.setAttribute('width', String(width));
    svgClone.setAttribute('height', String(height));
    svgClone.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const serializer = new XMLSerializer();
    const svgText = serializer.serializeToString(svgClone);
    const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 20, 20);

        canvas.toBlob((blob) => {
            if (!blob) {
                alert('Không thể xuất ảnh PNG.');
                URL.revokeObjectURL(url);
                return;
            }

            const anchor = document.createElement('a');
            anchor.download = `${document.getElementById('dbName').value || 'ERD'}_ERD.png`;
            anchor.href = URL.createObjectURL(blob);
            anchor.click();
            URL.revokeObjectURL(anchor.href);
            URL.revokeObjectURL(url);
        }, 'image/png');
    };

    img.onerror = () => {
        URL.revokeObjectURL(url);
        alert('Lỗi khi chuyển sơ đồ sang ảnh PNG.');
    };

    img.src = url;
}