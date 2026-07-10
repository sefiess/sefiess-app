const {
  useState,
  useEffect,
  useRef
} = React;
function sha256(ascii) {
  function rightRotate(value, amount) {
    return value >>> amount | value << 32 - amount;
  }
  var mathPow = Math.pow,
    maxWord = mathPow(2, 32),
    lengthProperty = 'length',
    i,
    j,
    result = '';
  var words = [],
    asciiBitLength = ascii[lengthProperty] * 8;
  var hash = sha256.h = sha256.h || [],
    k = sha256.k = sha256.k || [],
    primeCounter = k[lengthProperty];
  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
      hash[primeCounter] = mathPow(candidate, .5) * maxWord | 0;
      k[primeCounter++] = mathPow(candidate, 1 / 3) * maxWord | 0;
    }
  }
  ascii += '\x80';
  while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return;
    words[i >> 2] |= j << (3 - i) % 4 * 8;
  }
  words[words[lengthProperty]] = asciiBitLength / maxWord | 0;
  words[words[lengthProperty]] = asciiBitLength;
  for (j = 0; j < words[lengthProperty];) {
    var w = words.slice(j, j += 16),
      oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      var w15 = w[i - 15],
        w2 = w[i - 2];
      var a = hash[0],
        e = hash[4];
      var temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + (e & hash[5] ^ ~e & hash[6]) + k[i] + (w[i] = i < 16 ? w[i] : w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ w15 >>> 3) + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ w2 >>> 10) | 0);
      var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + (a & hash[1] ^ a & hash[2] ^ hash[1] & hash[2]);
      hash = [temp1 + temp2 | 0].concat(hash);
      hash[4] = hash[4] + temp1 | 0;
    }
    for (i = 0; i < 8; i++) hash[i] = hash[i] + oldHash[i] | 0;
  }
  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      var b = hash[i] >> j * 8 & 255;
      result += (b < 16 ? 0 : '') + b.toString(16);
    }
  }
  return result;
}
const DB_KEY = "sgg_data_v3";
const SESSION_KEY = "sgg_session_v3";
const MAX_GUARDIAS = 1000;
const MAX_SUPERV = 20;
const MAX_ADMIN = 20;
const SESSION_HORAS = 4;
const DEPARTAMENTOS = ["La Paz", "Cochabamba", "Santa Cruz", "Oruro", "Potosí", "Chuquisaca", "Tarija", "Beni", "Pando"];
function seed() {
  return {
    admins: {
      admin: {
        nombre: "Administrador",
        passHash: sha256("admin123")
      }
    },
    rrhh: {
      usuario: "rrhh",
      nombre: "Recursos Humanos",
      passHash: sha256("rrhh123")
    },
    operaciones: {
      usuario: "operaciones",
      nombre: "Operaciones",
      passHash: sha256("operaciones123")
    },
    guardPassHash: sha256("guardia123"),
    supPassHash: sha256("supervisor123"),
    adminPersPassHash: sha256("administrativo123"),
    notifyEmail: "",
    unidades: [{
      id: 1,
      nombre: "Centro Comercial Bolivia Digna",
      direccion: "Av. Principal, La Paz",
      maps: "https://maps.google.com/?q=-16.5000,-68.1500"
    }, {
      id: 2,
      nombre: "Mega Center",
      direccion: "Zona Sur, La Paz",
      maps: "https://maps.google.com/?q=-16.5400,-68.0800"
    }],
    guardias: [{
      id: 1,
      cuenta: "guardia0001",
      nombre: "Juan Pérez",
      ci: "1234567 LP",
      direccion: "Villa Fátima, calle 5 #123",
      direccionMaps: "",
      tel1: "71234567",
      tel2: "78000001",
      tel3: "",
      correo: "juan.perez@gmail.com",
      cargo: "Guardia de Seguridad",
      unidadId: 1,
      horario: "07:00 - 15:00",
      turno: "Diurno",
      departamento: "La Paz",
      tipo: "Fijo",
      ingreso: "2024-04-01",
      fin: "",
      estado: "Activo",
      obs: "Turno de mañana"
    }, {
      id: 2,
      cuenta: "guardia0002",
      nombre: "María López",
      ci: "2345678 LP",
      direccion: "Sopocachi, av. 6 de Agosto",
      direccionMaps: "",
      tel1: "71234568",
      tel2: "78000002",
      tel3: "",
      correo: "maria.lopez@gmail.com",
      cargo: "Guardia de Seguridad",
      unidadId: 1,
      horario: "15:00 - 23:00",
      turno: "Nocturno",
      departamento: "La Paz",
      tipo: "Fijo",
      ingreso: "2024-04-01",
      fin: "",
      estado: "Activo",
      obs: ""
    }, {
      id: 3,
      cuenta: "guardia0003",
      nombre: "Pedro Quispe",
      ci: "3456789 LP",
      direccion: "El Alto, zona 16 de Julio",
      direccionMaps: "",
      tel1: "71234569",
      tel2: "78000003",
      tel3: "",
      correo: "pedro.quispe@gmail.com",
      cargo: "Guardia de Seguridad",
      unidadId: 2,
      horario: "07:00 - 15:00",
      turno: "Diurno",
      departamento: "La Paz",
      tipo: "Extra",
      ingreso: "2024-04-05",
      fin: "",
      estado: "Activo",
      obs: ""
    }],
    supervisores: [{
      id: 501,
      cuenta: "supervisor01",
      nombre: "Carlos Mamani",
      ci: "4567890 CB",
      direccion: "Zona Central, Cochabamba",
      direccionMaps: "",
      tel1: "71234570",
      tel2: "",
      tel3: "",
      correo: "carlos.mamani@gmail.com",
      cargo: "Supervisor",
      unidadId: 2,
      horario: "07:00 - 19:00",
      turno: "Diurno",
      departamento: "Cochabamba",
      ingreso: "2024-03-01",
      fin: "",
      estado: "Activo",
      obs: ""
    }],
    administrativos: [{
      id: 801,
      cuenta: "administrativo01",
      nombre: "Lucía Vargas",
      ci: "5678901 LP",
      direccion: "Miraflores, La Paz",
      direccionMaps: "",
      tel1: "71234580",
      tel2: "",
      tel3: "",
      correo: "lucia.vargas@gmail.com",
      cargo: "Asistente administrativo",
      unidadId: 1,
      horario: "08:00 - 16:00",
      turno: "Diurno",
      departamento: "La Paz",
      ingreso: "2024-05-01",
      fin: "",
      estado: "Activo",
      obs: ""
    }],
    rondasPlan: [{
      id: 1,
      persRole: "guardia",
      persId: 1,
      unidadId: 1,
      punto: "Puerta principal",
      hora: "08:00"
    }, {
      id: 2,
      persRole: "guardia",
      persId: 1,
      unidadId: 1,
      punto: "Estacionamiento",
      hora: "10:00"
    }],
    asistencia: [],
    rondasReg: [],
    extras: [],
    infracciones: [],
    notifs: [],
    seq: 1000
  };
}
const firebaseConfig = {
  apiKey: "AIzaSyBTs9BD-loi3NT8vowsVCixXxk6_uWu010",
  authDomain: "sefiess-app.firebaseapp.com",
  projectId: "sefiess-app",
  storageBucket: "sefiess-app.firebasestorage.app",
  messagingSenderId: "644010636436",
  appId: "1:644010636436:web:9cce615fdfcac62f8e3081"
};
const LEGACY_KEYS = ["asistencia", "rondasReg", "extras", "infracciones"];
let fireCore = null,
  fireCols = null;
try {
  if (firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("PEGA_AQUI")) {
    firebase.initializeApp(firebaseConfig);
    const fs = firebase.firestore();
    try {
      fs.enablePersistence({
        synchronizeTabs: true
      });
    } catch (e) {}
    fireCore = fs.collection("sefiess").doc("estado");
    fireCols = {
      asistencia: fs.collection("sefiess_asistencia"),
      rondasReg: fs.collection("sefiess_rondasReg"),
      extras: fs.collection("sefiess_extras"),
      infracciones: fs.collection("sefiess_infracciones")
    };
    firebase.auth().signInAnonymously().catch(e => console.warn("No se pudo autenticar de forma anónima.", e));
  }
} catch (e) {
  console.warn("Firebase no disponible, funcionando solo local.", e);
}
function loadDB() {
  const base = seed();
  try {
    const s = localStorage.getItem(DB_KEY);
    if (s) {
      const saved = JSON.parse(s) || {};
      return {
        ...base,
        ...saved
      };
    }
  } catch (e) {}
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(base));
  } catch (e) {}
  return base;
}
const nucleoDeEstado = d => {
  const nx = {
    ...d
  };
  LEGACY_KEYS.forEach(k => delete nx[k]);
  return nx;
};
function diffPorId(prevArr, nextArr) {
  const prevMap = new Map((prevArr || []).map(x => [String(x.id), x]));
  const nextMap = new Map((nextArr || []).map(x => [String(x.id), x]));
  const upserts = [];
  const borrados = [];
  for (const [id, item] of nextMap) {
    const antes = prevMap.get(id);
    if (!antes || JSON.stringify(antes) !== JSON.stringify(item)) upserts.push(item);
  }
  for (const id of prevMap.keys()) {
    if (!nextMap.has(id)) borrados.push(id);
  }
  return {
    upserts,
    borrados
  };
}
let _ultimoSync = function () {
  try {
    const s = localStorage.getItem(DB_KEY);
    return s ? JSON.parse(s) : null;
  } catch (e) {
    return null;
  }
}();
let _saveTimer = null;
function saveDB(d) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(d));
  } catch (e) {}
  if (!fireCore) return;
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    const prev = _ultimoSync || {};
    fireCore.set(nucleoDeEstado(d)).catch(e => console.warn("No se pudo sincronizar el núcleo (sin señal, se reintenta solo).", e));
    LEGACY_KEYS.forEach(k => {
      const col = fireCols[k];
      if (!col) return;
      const {
        upserts,
        borrados
      } = diffPorId(prev[k], d[k]);
      upserts.forEach(item => {
        if (item && item.id != null) col.doc(String(item.id)).set(item).catch(() => {});
      });
      borrados.forEach(id => col.doc(id).delete().catch(() => {}));
    });
    _ultimoSync = d;
  }, 500);
}
const uid = db => {
  db.seq = (db.seq || 1000) + 1;
  return db.seq;
};
const fmtFecha = iso => {
  const d = new Date(iso);
  return d.toLocaleDateString('es-BO');
};
const fmtHora = iso => {
  const d = new Date(iso);
  return d.toLocaleTimeString('es-BO', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
const fmtFH = iso => fmtFecha(iso) + ' ' + fmtHora(iso);
const hoyISO = () => new Date().toISOString().slice(0, 10);
const mesActual = () => new Date().toISOString().slice(0, 7);
const gmailLink = (mail, su, body) => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(mail || "")}` + (su ? `&su=${encodeURIComponent(su)}` : '') + (body ? `&body=${encodeURIComponent(body)}` : '');
const waLink = tel => `https://wa.me/591${(tel || "").replace(/\D/g, '')}`;
function nextCuenta(lista, prefijo, pad, max) {
  const usadas = new Set(lista.map(x => x.cuenta));
  for (let i = 1; i <= max; i++) {
    const c = prefijo + String(i).padStart(pad, '0');
    if (!usadas.has(c)) return c;
  }
  return null;
}
const nextGuardia = arr => nextCuenta(arr, 'guardia', 4, MAX_GUARDIAS);
const nextSuperv = arr => nextCuenta(arr, 'supervisor', 2, MAX_SUPERV);
const nextAdmin = arr => nextCuenta(arr, 'administrativo', 2, MAX_ADMIN);
function personaDe(db, role, id) {
  if (role === 'supervisor') return (db.supervisores || []).find(x => x.id === id);
  if (role === 'administrativo') return (db.administrativos || []).find(x => x.id === id);
  if (role === 'rrhh') {
    const c = db.rrhh || {};
    return {
      id: 0,
      nombre: c.nombre || 'RR.HH.',
      cuenta: c.usuario || 'rrhh',
      horario: '',
      turno: '—',
      departamento: '—',
      unidadId: null
    };
  }
  if (role === 'operaciones') {
    const c = db.operaciones || {};
    return {
      id: 0,
      nombre: c.nombre || 'Operaciones',
      cuenta: c.usuario || 'operaciones',
      horario: '',
      turno: '—',
      departamento: '—',
      unidadId: null
    };
  }
  if (role === 'admin') {
    return {
      id: 0,
      nombre: 'Administración',
      cuenta: 'admin',
      horario: '',
      turno: '—',
      departamento: '—',
      unidadId: null
    };
  }
  return db.guardias.find(x => x.id === id);
}
function nombrePers(db, role, id) {
  const p = personaDe(db, role, id);
  return p ? p.nombre : '—';
}
function esAtraso(reg, persona) {
  if (!persona || reg.tipo !== 'entrada') return false;
  const inicio = (persona.horario || "").split('-')[0].trim();
  if (!/^\d{1,2}:\d{2}$/.test(inicio)) return false;
  const d = new Date(reg.fechaISO);
  const [hh, mm] = inicio.split(':').map(Number);
  const prog = new Date(d);
  prog.setHours(hh, mm, 0, 0);
  return (d - prog) / 60000 > 5;
}
function pushNotif(db, actor, texto) {
  const n = {
    id: uid(db),
    fechaISO: new Date().toISOString(),
    actorRole: actor.role,
    actorCuenta: actor.usuario,
    actorNombre: actor.nombre,
    texto
  };
  db.notifs = [n, ...(db.notifs || [])].slice(0, 300);
  return db;
}
const rolLabel = r => r === 'admin' ? 'Administración' : r === 'rrhh' ? 'Recursos Humanos' : r === 'operaciones' ? 'Operaciones' : r === 'supervisor' ? 'Supervisor' : r === 'administrativo' ? 'Administrativo' : 'Guardia';
const puedeExportar = r => r === 'admin' || r === 'rrhh' || r === 'operaciones';
function obtenerUbicacion() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Este dispositivo no soporta geolocalización.");
      return;
    }
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude.toFixed(6),
        lng = pos.coords.longitude.toFixed(6);
      resolve({
        coords: `${lat}, ${lng}`,
        maps: `https://maps.google.com/?q=${lat},${lng}`
      });
    }, err => {
      let m = "No se pudo obtener la ubicación.";
      if (err.code === 1) m = "Permiso de ubicación denegado.";
      if (err.code === 3) m = "Tiempo de espera agotado al ubicar el GPS.";
      reject(m);
    }, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    });
  });
}
function exportarPDF(titulo, columnas, filas) {
  const w = window.open('', '_blank');
  if (!w) {
    alert("Permita las ventanas emergentes para exportar el PDF.");
    return;
  }
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const thead = columnas.map(c => `<th>${esc(c)}</th>`).join('');
  const rows = filas.length ? filas.map(f => `<tr>${f.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${columnas.length}" style="text-align:center;color:#888">Sin registros</td></tr>`;
  const fecha = new Date().toLocaleString('es-BO');
  w.document.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>${esc(titulo)}</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;color:#16233a;padding:24px}
    h1{font-size:18px;color:#1f3a5f;margin:0 0 2px}
    .sub{font-size:12px;color:#7286a3;margin-bottom:16px}
    table{width:100%;border-collapse:collapse;font-size:12px}
    th{background:#1f3a5f;color:#fff;text-align:left;padding:8px 10px}
    td{padding:7px 10px;border-bottom:1px solid #d9e2ee}
    tr:nth-child(even) td{background:#f4f7fb}
    @media print{ @page{margin:14mm} }
  </style></head>
  <body onload="window.focus();window.print();">
    <h1>${esc(titulo)}</h1>
    <div class="sub">Generado: ${esc(fecha)} · Sefiess</div>
    <table><thead><tr>${thead}</tr></thead><tbody>${rows}</tbody></table>
  </body></html>`);
  w.document.close();
}
let _xlsxCargando = null;
function cargarXLSX() {
  if (window.XLSX) return Promise.resolve();
  if (_xlsxCargando) return _xlsxCargando;
  _xlsxCargando = new Promise(resolve => {
    const s = document.createElement('script');
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.head.appendChild(s);
  });
  return _xlsxCargando;
}
async function exportarExcel(nombre, columnas, filas) {
  try {
    await cargarXLSX();
    if (window.XLSX) {
      const ws = XLSX.utils.aoa_to_sheet([columnas, ...filas]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Datos");
      XLSX.writeFile(wb, nombre + ".xlsx");
      return;
    }
  } catch (e) {}
  const esc = s => {
    s = String(s == null ? '' : s);
    return /[",;\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const csv = [columnas, ...filas].map(r => r.map(esc).join(';')).join('\r\n');
  const blob = new Blob(["\ufeff" + csv], {
    type: 'text/csv;charset=utf-8;'
  });
  const url = URL.createObjectURL(blob),
    a = document.createElement('a');
  a.href = url;
  a.download = nombre + ".csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function lunesDe(base) {
  const x = new Date(base);
  const dow = (x.getDay() + 6) % 7;
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - dow);
  return x;
}
function semanaRango(offset) {
  const ini = lunesDe(new Date());
  ini.setDate(ini.getDate() + offset * 7);
  const fin = new Date(ini);
  fin.setDate(fin.getDate() + 6);
  fin.setHours(23, 59, 59, 999);
  const f = d => d.toLocaleDateString('es-BO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  return {
    ini,
    fin,
    label: `${f(ini)} al ${f(fin)}`,
    file: ini.toISOString().slice(0, 10)
  };
}
const Icon = ({
  d,
  size = 20,
  color = "currentColor",
  fill = "none",
  sw = 1.9
}) => React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: fill,
  stroke: color,
  strokeWidth: sw,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, d);
const I = {
  user: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
  }), React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  })),
  book: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
  }), React.createElement("path", {
    d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
  })),
  map: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M9 20l-6-3V4l6 3 6-3 6 3v13l-6-3-6 3z"
  }), React.createElement("path", {
    d: "M9 7v13M15 4v13"
  })),
  clock: React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), React.createElement("path", {
    d: "M12 7v5l3 2"
  })),
  route: React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "6",
    cy: "19",
    r: "3"
  }), React.createElement("path", {
    d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"
  }), React.createElement("circle", {
    cx: "18",
    cy: "5",
    r: "3"
  })),
  lock: React.createElement(React.Fragment, null, React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2"
  }), React.createElement("path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4"
  })),
  camera: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
  }), React.createElement("circle", {
    cx: "12",
    cy: "13",
    r: "4"
  })),
  logout: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
  }), React.createElement("path", {
    d: "M16 17l5-5-5-5M21 12H9"
  })),
  plus: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M12 5v14M5 12h14"
  })),
  check: React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }),
  x: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12"
  })),
  grid: React.createElement(React.Fragment, null, React.createElement("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "7"
  }), React.createElement("rect", {
    x: "14",
    y: "3",
    width: "7",
    height: "7"
  }), React.createElement("rect", {
    x: "14",
    y: "14",
    width: "7",
    height: "7"
  }), React.createElement("rect", {
    x: "3",
    y: "14",
    width: "7",
    height: "7"
  })),
  pin: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
  }), React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })),
  phone: React.createElement("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
  }),
  mail: React.createElement(React.Fragment, null, React.createElement("rect", {
    x: "2",
    y: "4",
    width: "20",
    height: "16",
    rx: "2"
  }), React.createElement("path", {
    d: "M22 7l-10 6L2 7"
  })),
  edit: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
  }), React.createElement("path", {
    d: "M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"
  })),
  trash: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  })),
  pdf: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), React.createElement("path", {
    d: "M14 2v6h6"
  }), React.createElement("path", {
    d: "M9 15h6M9 18h4"
  })),
  id: React.createElement(React.Fragment, null, React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "16",
    rx: "2"
  }), React.createElement("circle", {
    cx: "9",
    cy: "10",
    r: "2"
  }), React.createElement("path", {
    d: "M15 8h3M15 12h3M7 16h10"
  })),
  shield: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  })),
  bell: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
  }), React.createElement("path", {
    d: "M13.7 21a2 2 0 0 1-3.4 0"
  })),
  alert: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  }), React.createElement("path", {
    d: "M12 9v4M12 17h.01"
  })),
  swap: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M17 1l4 4-4 4"
  }), React.createElement("path", {
    d: "M3 11V9a4 4 0 0 1 4-4h14"
  }), React.createElement("path", {
    d: "M7 23l-4-4 4-4"
  }), React.createElement("path", {
    d: "M21 13v2a4 4 0 0 1-4 4H3"
  })),
  filter: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
  })),
  eye: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"
  }), React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })),
  eyeoff: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
  }), React.createElement("path", {
    d: "M1 1l22 22"
  })),
  brief: React.createElement(React.Fragment, null, React.createElement("rect", {
    x: "2",
    y: "7",
    width: "20",
    height: "14",
    rx: "2"
  }), React.createElement("path", {
    d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
  })),
  download: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), React.createElement("path", {
    d: "M7 10l5 5 5-5"
  }), React.createElement("path", {
    d: "M12 15V3"
  })),
  upload: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), React.createElement("path", {
    d: "M17 8l-5-5-5 5"
  }), React.createElement("path", {
    d: "M12 3v12"
  })),
  cal: React.createElement(React.Fragment, null, React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), React.createElement("path", {
    d: "M16 2v4M8 2v4M3 10h18"
  })),
  dl: React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), React.createElement("path", {
    d: "M7 10l5 5 5-5"
  }), React.createElement("path", {
    d: "M12 15V3"
  }))
};
function Badge({
  children,
  tone = "green"
}) {
  const map = {
    green: ['var(--green-bg)', 'var(--green-t)'],
    red: ['var(--red-bg)', 'var(--red-t)'],
    amber: ['var(--amber-bg)', 'var(--amber-t)'],
    blue: ['var(--soft)', 'var(--primary)'],
    sup: ['var(--sup-bg)', 'var(--sup-t)'],
    gray: ['#eef2f8', '#5a6b85']
  };
  const [bg, c] = map[tone] || map.gray;
  return React.createElement("span", {
    style: {
      background: bg,
      color: c,
      fontWeight: 700,
      fontSize: 11,
      padding: '3px 10px',
      borderRadius: 20,
      whiteSpace: 'nowrap'
    }
  }, children);
}
function Field({
  label,
  children
}) {
  return React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, React.createElement("label", {
    style: {
      display: 'block',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--dark)',
      marginBottom: 5
    }
  }, label), children);
}
const inputStyle = {
  width: '100%',
  padding: '11px 13px',
  border: '1.5px solid var(--line)',
  borderRadius: 10,
  fontSize: 15,
  outline: 'none',
  color: 'var(--dark)',
  background: '#f6f9fc'
};
function PassInput({
  value,
  onChange,
  placeholder = "••••••••",
  innerRef
}) {
  const [show, setShow] = useState(false);
  return React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, React.createElement("input", {
    ref: innerRef,
    type: show ? 'text' : 'password',
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    autoCapitalize: "none",
    autoCorrect: "off",
    style: {
      ...inputStyle,
      paddingRight: 46
    }
  }), React.createElement("button", {
    type: "button",
    onClick: () => setShow(s => !s),
    tabIndex: -1,
    "aria-label": show ? 'Ocultar' : 'Ver',
    style: {
      position: 'absolute',
      right: 6,
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      padding: 8,
      color: 'var(--muted)',
      display: 'flex'
    }
  }, React.createElement(Icon, {
    d: show ? I.eyeoff : I.eye,
    size: 19
  })));
}
function Modal({
  title,
  onClose,
  children
}) {
  return React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(12,27,48,.55)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    onClick: onClose
  }, React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: '#fff',
      width: '100%',
      maxWidth: 520,
      maxHeight: '92vh',
      overflowY: 'auto',
      borderRadius: '20px 20px 0 0',
      padding: '20px 20px 28px'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16
    }
  }, React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, title), React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'var(--soft2)',
      border: 'none',
      borderRadius: 10,
      padding: 8,
      color: 'var(--muted)'
    }
  }, React.createElement(Icon, {
    d: I.x
  }))), children));
}
function Card({
  children,
  style
}) {
  return React.createElement("div", {
    style: {
      background: 'var(--card)',
      borderRadius: 14,
      border: '1px solid var(--line)',
      padding: 16,
      marginBottom: 12,
      ...style
    }
  }, children);
}
function SectionTitle({
  children,
  right
}) {
  return React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '4px 2px 12px',
      gap: 8
    }
  }, React.createElement("h2", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, children), right);
}
const btnGhost = {
  flex: 1,
  padding: '9px',
  background: '#f6f9fc',
  border: '1px solid var(--line)',
  borderRadius: 9,
  fontWeight: 700,
  fontSize: 13,
  color: 'var(--body)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5
};
function Empty({
  children
}) {
  return React.createElement(Card, {
    style: {
      textAlign: 'center',
      color: 'var(--muted)',
      fontSize: 14
    }
  }, children);
}
function ChipGroup({
  label,
  opciones,
  sel,
  setSel
}) {
  const valor = sel.length === 1 ? sel[0] : "";
  return React.createElement("div", {
    style: {
      marginBottom: 8,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: 'var(--muted)',
      textTransform: 'uppercase',
      letterSpacing: .5,
      flexShrink: 0,
      width: 92,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, label), React.createElement("select", {
    value: valor,
    onChange: e => setSel(e.target.value ? [e.target.value] : []),
    style: {
      ...inputStyle,
      flex: 1,
      padding: '7px 10px',
      fontSize: 13,
      fontWeight: 600,
      height: 'auto'
    }
  }, React.createElement("option", {
    value: ""
  }, "Todos"), opciones.map(o => React.createElement("option", {
    key: o.v,
    value: o.v
  }, o.t))));
}
function SemanaNav({
  sem,
  semOff,
  setSemOff
}) {
  const etiqueta = semOff === 0 ? 'Semana actual' : semOff < 0 ? `Hace ${-semOff} semana${semOff === -1 ? '' : 's'}` : `En ${semOff} semana${semOff === 1 ? '' : 's'}`;
  return React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12
    }
  }, React.createElement("button", {
    onClick: () => setSemOff(semOff - 1),
    style: {
      flex: '0 0 46px',
      padding: '12px 0',
      background: '#f6f9fc',
      border: '1px solid var(--line)',
      borderRadius: 10,
      fontWeight: 800,
      fontSize: 18,
      color: 'var(--primary)',
      lineHeight: 1
    }
  }, "‹"), React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      background: 'var(--soft2)',
      borderRadius: 10,
      padding: '8px'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--muted)',
      fontWeight: 700
    }
  }, etiqueta), React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, sem.label)), React.createElement("button", {
    onClick: () => setSemOff(Math.min(0, semOff + 1)),
    disabled: semOff >= 0,
    style: {
      flex: '0 0 46px',
      padding: '12px 0',
      background: semOff >= 0 ? '#eef2f8' : '#f6f9fc',
      border: '1px solid var(--line)',
      borderRadius: 10,
      fontWeight: 800,
      fontSize: 18,
      color: semOff >= 0 ? 'var(--muted)' : 'var(--primary)',
      lineHeight: 1
    }
  }, "›"));
}
function SemanaNavFiltros({
  sem,
  semOff,
  setSemOff,
  children
}) {
  const [open, setOpen] = useState(false);
  const etiqueta = semOff === 0 ? 'Semana actual' : semOff < 0 ? `Hace ${-semOff} semana${semOff === -1 ? '' : 's'}` : `En ${semOff} semana${semOff === 1 ? '' : 's'}`;
  return React.createElement(Card, {
    style: {
      padding: 0,
      marginBottom: 12,
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: 10
    }
  }, React.createElement("button", {
    onClick: () => setSemOff(semOff - 1),
    style: {
      flex: '0 0 46px',
      padding: '12px 0',
      background: '#f6f9fc',
      border: '1px solid var(--line)',
      borderRadius: 10,
      fontWeight: 800,
      fontSize: 18,
      color: 'var(--primary)',
      lineHeight: 1
    }
  }, "‹"), React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      flex: 1,
      textAlign: 'center',
      background: 'var(--soft2)',
      border: 'none',
      borderRadius: 10,
      padding: '8px',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, React.createElement(Icon, {
    d: I.filter,
    size: 12,
    color: "var(--muted)"
  }), React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--muted)',
      fontWeight: 700
    }
  }, etiqueta)), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, sem.label), React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--primary)',
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform .15s',
      lineHeight: 1
    }
  }, "▾"))), React.createElement("button", {
    onClick: () => setSemOff(Math.min(0, semOff + 1)),
    disabled: semOff >= 0,
    style: {
      flex: '0 0 46px',
      padding: '12px 0',
      background: semOff >= 0 ? '#eef2f8' : '#f6f9fc',
      border: '1px solid var(--line)',
      borderRadius: 10,
      fontWeight: 800,
      fontSize: 18,
      color: semOff >= 0 ? 'var(--muted)' : 'var(--primary)',
      lineHeight: 1
    }
  }, "›")), open && React.createElement("div", {
    style: {
      padding: '0 14px 14px'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      margin: '6px 0 10px'
    }
  }, React.createElement(Icon, {
    d: I.filter,
    size: 16,
    color: "var(--primary)"
  }), React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 13,
      color: 'var(--dark)'
    }
  }, "Filtros")), children));
}
function Login({
  db,
  onLogin
}) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);
  const entrar = e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const u = usuario.trim().toLowerCase();
      const h = sha256(password);
      const adm = db.admins[u];
      if (adm && adm.passHash === h) {
        onLogin({
          role: "admin",
          usuario: u,
          nombre: adm.nombre
        });
        return;
      }
      if (db.rrhh && u === db.rrhh.usuario && db.rrhh.passHash === h) {
        onLogin({
          role: "rrhh",
          usuario: u,
          nombre: db.rrhh.nombre,
          persId: 0
        });
        return;
      }
      if (db.operaciones && u === db.operaciones.usuario && db.operaciones.passHash === h) {
        onLogin({
          role: "operaciones",
          usuario: u,
          nombre: db.operaciones.nombre,
          persId: 0
        });
        return;
      }
      const a = (db.administrativos || []).find(x => x.cuenta.toLowerCase() === u);
      if (a && h === db.adminPersPassHash) {
        if (a.estado !== "Activo") {
          setError("Esta cuenta está inactiva. Contacte al administrador.");
          setLoading(false);
          return;
        }
        onLogin({
          role: "administrativo",
          usuario: u,
          nombre: a.nombre,
          persId: a.id
        });
        return;
      }
      const g = db.guardias.find(x => x.cuenta.toLowerCase() === u);
      if (g && h === db.guardPassHash) {
        if (g.estado !== "Activo") {
          setError("Esta cuenta está inactiva. Contacte al administrador.");
          setLoading(false);
          return;
        }
        onLogin({
          role: "guardia",
          usuario: u,
          nombre: g.nombre,
          persId: g.id
        });
        return;
      }
      const s = (db.supervisores || []).find(x => x.cuenta.toLowerCase() === u);
      if (s && h === db.supPassHash) {
        if (s.estado !== "Activo") {
          setError("Esta cuenta está inactiva. Contacte al administrador.");
          setLoading(false);
          return;
        }
        onLogin({
          role: "supervisor",
          usuario: u,
          nombre: s.nombre,
          persId: s.id
        });
        return;
      }
      setError("Usuario o contraseña incorrectos.");
      setLoading(false);
    }, 350);
  };
  return React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto',
      background: `linear-gradient(160deg,var(--primary) 0%,var(--primary-dd) 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 400
    }
  }, React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 24,
      color: '#fff'
    }
  }, React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      margin: '0 auto 14px',
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: '0 6px 20px rgba(0,0,0,.25)'
    }
  }, React.createElement("img", {
    src: "icons/icon-192.png?v=2",
    alt: "Sefiess",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: 2,
      textTransform: 'uppercase',
      opacity: .7,
      fontWeight: 700
    }
  }, "Sistema de"), React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: 1
    }
  }, "SEFIESS"), React.createElement("div", {
    style: {
      fontSize: 12.5,
      opacity: .65,
      marginTop: 6
    }
  }, "Control de asistencia y rondas")), React.createElement("form", {
    onSubmit: entrar,
    style: {
      background: '#fff',
      borderRadius: 18,
      padding: '24px 22px',
      boxShadow: '0 20px 50px rgba(0,0,0,.3)'
    }
  }, React.createElement(Field, {
    label: "Usuario"
  }, React.createElement("input", {
    ref: ref,
    value: usuario,
    onChange: e => setUsuario(e.target.value),
    placeholder: "admin · rrhh · operaciones · guardia0001 …",
    autoCapitalize: "none",
    autoCorrect: "off",
    style: inputStyle
  })), React.createElement(Field, {
    label: "Contraseña"
  }, React.createElement(PassInput, {
    value: password,
    onChange: e => setPassword(e.target.value)
  })), error && React.createElement("div", {
    style: {
      background: 'var(--red-bg)',
      color: 'var(--red-t)',
      fontSize: 13,
      fontWeight: 600,
      padding: '9px 12px',
      borderRadius: 9,
      marginBottom: 12
    }
  }, error), React.createElement("button", {
    type: "submit",
    disabled: loading || !usuario || !password,
    style: {
      width: '100%',
      padding: '13px',
      background: loading ? '#9db0c9' : 'var(--primary)',
      color: '#fff',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 15,
      marginTop: 4
    }
  }, loading ? 'Verificando…' : 'Ingresar'), React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 11.5,
      color: 'var(--muted)',
      textAlign: 'center',
      lineHeight: 1.6
    }
  }, "El sistema lo dirige automáticamente a su panel", React.createElement("br", null), "según sus credenciales."))));
}
function Shell({
  title,
  subtitle,
  tabs,
  active,
  setActive,
  onLogout,
  children
}) {
  const [masOpen, setMasOpen] = useState(false);
  const MAXBAR = 4;
  const primary = tabs.length <= 5 ? tabs : tabs.slice(0, MAXBAR);
  const overflow = tabs.length <= 5 ? [] : tabs.slice(MAXBAR);
  const activeInOverflow = overflow.some(t => t.id === active);
  const go = id => {
    setActive(id);
    setMasOpen(false);
  };
  return React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg)'
    }
  }, React.createElement("div", {
    style: {
      background: '#fff',
      borderBottom: '1px solid var(--line)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, title), subtitle && React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      marginTop: 1
    }
  }, subtitle)), React.createElement("button", {
    onClick: onLogout,
    style: {
      background: 'var(--red-bg)',
      border: 'none',
      borderRadius: 10,
      padding: '8px 12px',
      color: 'var(--red-t)',
      fontWeight: 700,
      fontSize: 12.5,
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, React.createElement(Icon, {
    d: I.logout,
    size: 16
  }), " Salir")), React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 14px 90px'
    }
  }, children), masOpen && React.createElement("div", {
    onClick: () => setMasOpen(false),
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(12,27,48,.5)',
      zIndex: 60,
      display: 'flex',
      alignItems: 'flex-end'
    }
  }, React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: '#fff',
      width: '100%',
      borderRadius: '20px 20px 0 0',
      padding: '18px 16px calc(20px + env(safe-area-inset-bottom))'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, React.createElement("h3", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, "Más apartados"), React.createElement("button", {
    onClick: () => setMasOpen(false),
    style: {
      background: 'var(--soft2)',
      border: 'none',
      borderRadius: 10,
      padding: 8,
      color: 'var(--muted)'
    }
  }, React.createElement(Icon, {
    d: I.x
  }))), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, overflow.map(t => {
    const on = active === t.id;
    return React.createElement("button", {
      key: t.id,
      onClick: () => go(t.id),
      style: {
        background: on ? 'var(--soft)' : '#f6f9fc',
        border: '1px solid ' + (on ? 'var(--primary)' : 'var(--line)'),
        borderRadius: 14,
        padding: 14,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, React.createElement(Icon, {
      d: t.icon,
      size: 20,
      color: on ? 'var(--primary)' : 'var(--body)'
    }), React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: on ? 'var(--primary)' : 'var(--dark)'
      }
    }, t.label));
  })))), React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#fff',
      borderTop: '1px solid var(--line)',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '8px 4px calc(8px + env(safe-area-inset-bottom))',
      boxShadow: '0 -4px 16px rgba(0,0,0,.04)'
    }
  }, primary.map(t => {
    const on = active === t.id;
    return React.createElement("button", {
      key: t.id,
      onClick: () => go(t.id),
      style: {
        background: 'none',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        flex: 1,
        padding: '4px 2px',
        color: on ? 'var(--primary)' : 'var(--muted)'
      }
    }, React.createElement(Icon, {
      d: t.icon,
      size: 22,
      sw: on ? 2.2 : 1.9
    }), React.createElement("span", {
      style: {
        fontSize: 10.5,
        fontWeight: on ? 700 : 600,
        textAlign: 'center',
        lineHeight: 1.1
      }
    }, t.label));
  }), overflow.length > 0 && React.createElement("button", {
    onClick: () => setMasOpen(true),
    style: {
      background: 'none',
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
      flex: 1,
      padding: '4px 2px',
      color: activeInOverflow ? 'var(--primary)' : 'var(--muted)'
    }
  }, React.createElement(Icon, {
    d: I.grid,
    size: 22,
    sw: activeInOverflow ? 2.2 : 1.9
  }), React.createElement("span", {
    style: {
      fontSize: 10.5,
      fontWeight: activeInOverflow ? 700 : 600
    }
  }, "Más"))));
}
function CapturaEnVivo({
  label,
  color,
  onConfirm
}) {
  const [fase, setFase] = useState('idle');
  const [thumb, setThumb] = useState(null);
  const [ubic, setUbic] = useState(null);
  const [hora, setHora] = useState(null);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const detener = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };
  useEffect(() => () => detener(), []);
  const abrir = async () => {
    setErr('');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErr("La cámara no está disponible en este navegador.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        },
        audio: false
      });
      streamRef.current = stream;
      setFase('camara');
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      }, 60);
    } catch (e) {
      setErr("No se pudo abrir la cámara. Verifique los permisos y que la página esté en HTTPS.");
    }
  };
  const capturar = async () => {
    const v = videoRef.current;
    try {
      const c = document.createElement('canvas');
      c.width = v.videoWidth || 640;
      c.height = v.videoHeight || 480;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      setThumb(c.toDataURL('image/jpeg', 0.5));
    } catch (e) {
      setThumb(null);
    }
    detener();
    const nowISO = new Date().toISOString();
    setHora(nowISO);
    setFase('listo');
    setUbic(null);
    setErr('');
    setMsg('Obteniendo ubicación GPS…');
    try {
      const u = await obtenerUbicacion();
      setUbic(u);
      setMsg('');
    } catch (e) {
      setErr(String(e));
      setMsg('');
    }
  };
  const reiniciar = () => {
    detener();
    setFase('idle');
    setThumb(null);
    setUbic(null);
    setHora(null);
    setMsg('');
    setErr('');
  };
  const confirmar = () => {
    onConfirm({
      fechaISO: hora,
      coords: ubic ? ubic.coords : null,
      maps: ubic ? ubic.maps : null
    });
    reiniciar();
  };
  return React.createElement(Card, null, fase === 'idle' && React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, React.createElement("div", {
    style: {
      width: 96,
      height: 96,
      margin: '6px auto 12px',
      borderRadius: '50%',
      border: `2px dashed ${color}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--soft2)'
    }
  }, React.createElement(Icon, {
    d: I.camera,
    size: 40,
    color: color
  })), React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--dark)',
      fontSize: 15
    }
  }, "Verificación con foto en vivo"), React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--muted)',
      marginTop: 2,
      marginBottom: 14
    }
  }, "Solo se abre la cámara. No se pueden subir archivos."), React.createElement("button", {
    onClick: abrir,
    style: {
      width: '100%',
      padding: '13px',
      background: color,
      color: '#fff',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 15,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, React.createElement(Icon, {
    d: I.camera,
    size: 19,
    color: "#fff"
  }), " ", label), err && React.createElement("div", {
    style: {
      background: 'var(--amber-bg)',
      color: 'var(--amber-t)',
      fontSize: 12.5,
      fontWeight: 600,
      padding: '9px 11px',
      borderRadius: 9,
      marginTop: 12,
      textAlign: 'left'
    }
  }, "⚠ ", err)), fase === 'camara' && React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, React.createElement("video", {
    ref: videoRef,
    playsInline: true,
    muted: true,
    style: {
      width: '100%',
      maxHeight: 300,
      objectFit: 'cover',
      borderRadius: 12,
      background: '#000',
      marginBottom: 12
    }
  }), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement("button", {
    onClick: reiniciar,
    style: {
      flex: 1,
      padding: '12px',
      background: '#f1f5f9',
      color: 'var(--body)',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 14
    }
  }, "Cancelar"), React.createElement("button", {
    onClick: capturar,
    style: {
      flex: 2,
      padding: '12px',
      background: color,
      color: '#fff',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7
    }
  }, React.createElement(Icon, {
    d: I.camera,
    size: 18,
    color: "#fff"
  }), " Capturar foto"))), fase === 'listo' && React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, thumb && React.createElement("img", {
    src: thumb,
    alt: "verificación",
    style: {
      width: '100%',
      maxHeight: 220,
      objectFit: 'cover',
      borderRadius: 12,
      marginBottom: 6
    }
  }), React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--muted)',
      marginBottom: 10
    }
  }, "La foto es solo para verificar la captura en vivo y no se guarda."), React.createElement("div", {
    style: {
      textAlign: 'left',
      fontSize: 13.5,
      lineHeight: 1.9,
      marginBottom: 8
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, React.createElement(Icon, {
    d: I.clock,
    size: 16,
    color: "var(--primary)"
  }), React.createElement("span", null, React.createElement("b", null, "Hora:"), " ", fmtHora(hora), " · ", fmtFecha(hora))), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'flex-start'
    }
  }, React.createElement(Icon, {
    d: I.pin,
    size: 16,
    color: "var(--primary)"
  }), React.createElement("span", null, React.createElement("b", null, "Ubicación:"), " ", ubic ? React.createElement(React.Fragment, null, ubic.coords, " · ", React.createElement("a", {
    href: ubic.maps,
    target: "_blank",
    style: {
      color: 'var(--primary)',
      fontWeight: 700
    }
  }, "abrir ubicación")) : React.createElement("span", {
    style: {
      color: 'var(--amber-t)'
    }
  }, "sin GPS")))), msg && React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--primary)',
      fontWeight: 600,
      marginBottom: 8
    }
  }, msg), err && React.createElement("div", {
    style: {
      background: 'var(--amber-bg)',
      color: 'var(--amber-t)',
      fontSize: 12,
      fontWeight: 600,
      padding: '8px 10px',
      borderRadius: 9,
      marginBottom: 8,
      textAlign: 'left'
    }
  }, "⚠ ", err, " Se guardará el registro sin coordenadas."), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement("button", {
    onClick: reiniciar,
    style: {
      flex: 1,
      padding: '12px',
      background: '#f1f5f9',
      color: 'var(--body)',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 14
    }
  }, "Repetir"), React.createElement("button", {
    onClick: confirmar,
    disabled: !!msg,
    style: {
      flex: 2,
      padding: '12px',
      background: msg ? '#9db0c9' : 'var(--green)',
      color: '#fff',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7
    }
  }, React.createElement(Icon, {
    d: I.check,
    size: 18,
    color: "#fff"
  }), " Confirmar registro"))));
}
function AutoAsistencia({
  db,
  setDb,
  auth,
  persona
}) {
  const role = auth.role;
  const unidad = db.unidades.find(u => u.id === persona.unidadId);
  const hoy = hoyISO();
  const regsHoy = db.asistencia.filter(a => a.persRole === role && a.persId === persona.id && a.fechaISO.slice(0, 10) === hoy);
  const entrada = regsHoy.find(a => a.tipo === 'entrada');
  const salida = regsHoy.find(a => a.tipo === 'salida');
  const [modo, setModo] = useState(null);
  const estadoEntrada = (() => {
    if (!entrada) return null;
    if (esAtraso(entrada, persona)) {
      const d = new Date(entrada.fechaISO);
      const [hh, mm] = (persona.horario || '').split('-')[0].trim().split(':').map(Number);
      const prog = new Date(d);
      prog.setHours(hh, mm, 0, 0);
      return {
        tone: 'red',
        txt: 'Atrasado (+' + Math.round((d - prog) / 60000) + ' min)'
      };
    }
    return {
      tone: 'green',
      txt: 'En hora'
    };
  })();
  const registrar = (tipo, data) => {
    setDb(prev => {
      const nx = {
        ...prev,
        asistencia: [...prev.asistencia, {
          id: uid(prev),
          persRole: role,
          persId: persona.id,
          tipo,
          ...data
        }]
      };
      pushNotif(nx, auth, `${rolLabel(role)} ${persona.nombre} registró ${tipo}`);
      saveDB(nx);
      return nx;
    });
    setModo(null);
  };
  return React.createElement(React.Fragment, null, React.createElement(Card, {
    style: {
      background: 'linear-gradient(135deg,var(--primary),var(--primary-d))',
      border: 'none',
      color: '#fff'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 12,
      opacity: .8,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 1
    }
  }, "Asistencia del día"), React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      marginTop: 2
    }
  }, new Date().toLocaleDateString('es-BO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginTop: 12,
      fontSize: 13
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      opacity: .75
    }
  }, "Centro"), React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, unidad ? unidad.nombre : '—')), React.createElement("div", null, React.createElement("div", {
    style: {
      opacity: .75
    }
  }, "Horario"), React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, persona.horario)))), React.createElement(Card, null, React.createElement("div", {
    style: {
      fontWeight: 800,
      color: 'var(--dark)',
      marginBottom: 12
    }
  }, "Registros de hoy"), React.createElement(RegRow, {
    tipo: "Entrada",
    reg: entrada,
    estado: estadoEntrada
  }), React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--line)',
      margin: '10px 0'
    }
  }), React.createElement(RegRow, {
    tipo: "Salida",
    reg: salida
  })), !entrada && !modo && React.createElement("button", {
    onClick: () => setModo('entrada'),
    style: {
      width: '100%',
      padding: '15px',
      background: 'var(--primary)',
      color: '#fff',
      border: 'none',
      borderRadius: 12,
      fontWeight: 700,
      fontSize: 15,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, React.createElement(Icon, {
    d: I.check,
    size: 20,
    color: "#fff"
  }), " Registrar entrada"), entrada && !salida && !modo && React.createElement("button", {
    onClick: () => setModo('salida'),
    style: {
      width: '100%',
      padding: '15px',
      background: 'var(--dark)',
      color: '#fff',
      border: 'none',
      borderRadius: 12,
      fontWeight: 700,
      fontSize: 15,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, React.createElement(Icon, {
    d: I.logout,
    size: 19,
    color: "#fff"
  }), " Registrar salida"), entrada && salida && React.createElement(Card, {
    style: {
      textAlign: 'center',
      background: 'var(--green-bg)',
      border: '1px solid #c3ddc9'
    }
  }, React.createElement(Icon, {
    d: I.check,
    size: 30,
    color: "var(--green)"
  }), React.createElement("div", {
    style: {
      fontWeight: 800,
      color: 'var(--green-t)',
      marginTop: 6
    }
  }, "Jornada completa registrada")), modo && React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, React.createElement(SectionTitle, {
    right: React.createElement("button", {
      onClick: () => setModo(null),
      style: {
        background: '#f1f5f9',
        border: 'none',
        borderRadius: 9,
        padding: '6px 10px',
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--muted)'
      }
    }, "Cancelar")
  }, "Registro de ", modo), React.createElement(CapturaEnVivo, {
    label: modo === 'entrada' ? 'Abrir cámara para entrada' : 'Abrir cámara para salida',
    color: modo === 'entrada' ? 'var(--primary)' : 'var(--dark)',
    onConfirm: data => registrar(modo, data)
  })));
}
function RegRow({
  tipo,
  reg,
  estado
}) {
  return React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      background: reg ? 'var(--green-bg)' : 'var(--soft2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    d: tipo === 'Entrada' ? I.clock : I.logout,
    size: 19,
    color: reg ? 'var(--green)' : 'var(--muted)'
  })), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--dark)',
      fontSize: 14
    }
  }, tipo), reg ? React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, fmtHora(reg.fechaISO), reg.maps && React.createElement(React.Fragment, null, " · ", React.createElement("a", {
    href: reg.maps,
    target: "_blank",
    style: {
      color: 'var(--primary)',
      fontWeight: 700
    }
  }, "ubicación"))) : React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, "Pendiente de registro")), estado && React.createElement(Badge, {
    tone: estado.tone
  }, estado.txt));
}
function AutoRonda({
  db,
  setDb,
  auth,
  persona
}) {
  const role = auth.role;
  const hoy = hoyISO();
  const plan = db.rondasPlan.filter(p => p.persRole === role && p.persId === persona.id);
  const regsHoy = db.rondasReg.filter(r => r.persRole === role && r.persId === persona.id && r.fechaISO.slice(0, 10) === hoy);
  const [activo, setActivo] = useState(null);
  const [edit, setEdit] = useState(null);
  const registrar = (punto, data) => {
    setDb(prev => {
      const nx = {
        ...prev,
        rondasReg: [...prev.rondasReg, {
          id: uid(prev),
          persRole: role,
          persId: persona.id,
          punto,
          ...data
        }]
      };
      pushNotif(nx, auth, `${rolLabel(role)} ${persona.nombre} pasó ronda: ${punto}`);
      saveDB(nx);
      return nx;
    });
    setActivo(null);
  };
  const guardarPunto = p => {
    setDb(prev => {
      let nx;
      if (p.id) {
        nx = {
          ...prev,
          rondasPlan: prev.rondasPlan.map(x => x.id === p.id ? {
            ...x,
            ...p
          } : x)
        };
      } else {
        nx = {
          ...prev,
          rondasPlan: [...prev.rondasPlan, {
            ...p,
            id: uid(prev),
            persRole: role,
            persId: persona.id,
            unidadId: persona.unidadId
          }]
        };
      }
      saveDB(nx);
      return nx;
    });
    setEdit(null);
  };
  const borrarPunto = id => {
    if (!confirm("¿Eliminar este punto?")) return;
    setDb(prev => {
      const nx = {
        ...prev,
        rondasPlan: prev.rondasPlan.filter(p => p.id !== id)
      };
      saveDB(nx);
      return nx;
    });
  };
  return React.createElement(React.Fragment, null, React.createElement(SectionTitle, {
    right: React.createElement("button", {
      onClick: () => setEdit('nuevo'),
      style: {
        background: 'var(--primary)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '8px 12px',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }
    }, React.createElement(Icon, {
      d: I.plus,
      size: 16,
      color: "#fff"
    }), " Punto")
  }, "Mi ronda de control"), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)',
      margin: '-6px 2px 12px'
    }
  }, "Puede añadir o modificar los puntos según su centro de trabajo."), plan.length === 0 && React.createElement(Empty, null, "No tiene puntos de ronda. Añada uno con el botón «Punto»."), plan.map(p => {
    const reg = regsHoy.find(r => r.punto === p.punto);
    return React.createElement(Card, {
      key: p.id
    }, React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 11,
        background: reg ? 'var(--green-bg)' : 'var(--soft)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, React.createElement(Icon, {
      d: I.route,
      size: 20,
      color: reg ? 'var(--green)' : 'var(--primary)'
    })), React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, React.createElement("div", {
      style: {
        fontWeight: 700,
        color: 'var(--dark)'
      }
    }, p.punto), React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: 'var(--muted)'
      }
    }, "Programado: ", p.hora)), reg ? React.createElement(Badge, {
      tone: "green"
    }, "Hecho ", fmtHora(reg.fechaISO)) : React.createElement(Badge, {
      tone: "amber"
    }, "Pendiente")), reg && reg.maps && React.createElement("div", {
      style: {
        marginTop: 8,
        fontSize: 12
      }
    }, React.createElement("a", {
      href: reg.maps,
      target: "_blank",
      style: {
        color: 'var(--primary)',
        fontWeight: 700
      }
    }, "abrir ubicación")), React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginTop: 12
      }
    }, !reg && activo !== p.id && React.createElement("button", {
      onClick: () => setActivo(p.id),
      style: {
        flex: 1,
        padding: '10px',
        background: 'var(--primary)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        fontWeight: 700,
        fontSize: 13.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6
      }
    }, React.createElement(Icon, {
      d: I.camera,
      size: 16,
      color: "#fff"
    }), " Pasar ronda"), React.createElement("button", {
      onClick: () => setEdit(p),
      style: {
        ...btnGhost,
        flex: '0 0 44px'
      }
    }, React.createElement(Icon, {
      d: I.edit,
      size: 16
    })), React.createElement("button", {
      onClick: () => borrarPunto(p.id),
      style: {
        ...btnGhost,
        flex: '0 0 44px',
        color: 'var(--red)'
      }
    }, React.createElement(Icon, {
      d: I.trash,
      size: 16
    }))), activo === p.id && React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, React.createElement(CapturaEnVivo, {
      label: "Abrir cámara del punto",
      color: "var(--primary)",
      onConfirm: data => registrar(p.punto, data)
    }), React.createElement("button", {
      onClick: () => setActivo(null),
      style: {
        width: '100%',
        padding: '9px',
        background: 'none',
        border: 'none',
        color: 'var(--muted)',
        fontWeight: 600,
        fontSize: 13
      }
    }, "Cancelar")));
  }), edit && React.createElement(PuntoRondaForm, {
    punto: edit === 'nuevo' ? null : edit,
    onSave: guardarPunto,
    onClose: () => setEdit(null)
  }));
}
function PuntoRondaForm({
  punto,
  onSave,
  onClose
}) {
  const [f, setF] = useState(punto || {
    punto: "",
    hora: "08:00"
  });
  const set = (k, v) => setF(p => ({
    ...p,
    [k]: v
  }));
  return React.createElement(Modal, {
    title: punto ? "Editar punto" : "Nuevo punto de ronda",
    onClose: onClose
  }, React.createElement(Field, {
    label: "Punto a supervisar *"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.punto,
    onChange: e => set('punto', e.target.value),
    placeholder: "Ej: Puerta principal"
  })), React.createElement(Field, {
    label: "Hora programada"
  }, React.createElement("input", {
    type: "time",
    style: inputStyle,
    value: f.hora,
    onChange: e => set('hora', e.target.value)
  })), React.createElement("button", {
    onClick: () => {
      if (!f.punto.trim()) {
        alert("Ingrese el nombre del punto");
        return;
      }
      onSave(f);
    },
    style: {
      width: '100%',
      padding: '13px',
      background: 'var(--primary)',
      color: '#fff',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 15,
      marginTop: 4
    }
  }, "Guardar"));
}
function MisInfracciones({
  db,
  persona,
  role
}) {
  const lista = (db.infracciones || []).filter(x => x.destRole === role && x.destId === persona.id).sort((a, b) => new Date(b.createdISO) - new Date(a.createdISO));
  return React.createElement(React.Fragment, null, React.createElement(SectionTitle, null, "Mis infracciones y comunicados"), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)',
      margin: '-6px 2px 12px'
    }
  }, "Aquí ve los comunicados que le asigna administración, RR.HH., operaciones o su supervisor. Solo lectura."), lista.length === 0 && React.createElement(Card, {
    style: {
      textAlign: 'center',
      background: 'var(--green-bg)',
      border: '1px solid #c3ddc9'
    }
  }, React.createElement(Icon, {
    d: I.check,
    size: 28,
    color: "var(--green)"
  }), React.createElement("div", {
    style: {
      fontWeight: 800,
      color: 'var(--green-t)',
      marginTop: 6
    }
  }, "Sin infracciones registradas")), lista.map(x => React.createElement(Card, {
    key: x.id,
    style: {
      borderLeft: '4px solid var(--red)'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 6
    }
  }, React.createElement(Icon, {
    d: I.alert,
    size: 20,
    color: "var(--red)"
  }), React.createElement("div", {
    style: {
      fontWeight: 800,
      color: 'var(--dark)',
      flex: 1
    }
  }, x.concepto)), React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--body)',
      lineHeight: 1.5,
      marginBottom: 8,
      whiteSpace: 'pre-wrap'
    }
  }, x.detalle), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)',
      lineHeight: 1.7,
      borderTop: '1px solid var(--line)',
      paddingTop: 8
    }
  }, React.createElement("div", null, React.createElement("b", null, "Fecha del hecho:"), " ", x.fechaEvento, " ", x.horaEvento || ''), React.createElement("div", null, React.createElement("b", null, "Emitido por:"), " ", x.emisorNombre, " (", rolLabel(x.emisorRole), " · ", x.emisorCuenta, ")"), React.createElement("div", null, React.createElement("b", null, "Registrado:"), " ", fmtFH(x.createdISO))))));
}
function GuardiaApp({
  db,
  setDb,
  auth,
  onLogout
}) {
  const [tab, setTab] = useState("micontrol");
  const g = db.guardias.find(x => x.id === auth.persId);
  const tabs = [{
    id: "micontrol",
    label: "Mi control",
    icon: I.clock
  }, {
    id: "infracciones",
    label: "Infracciones y comunicados",
    icon: I.alert
  }];
  return React.createElement(Shell, {
    title: g.nombre,
    subtitle: `${g.cargo} · ${g.cuenta}`,
    onLogout: onLogout,
    tabs: tabs,
    active: tab,
    setActive: setTab
  }, tab === "micontrol" && React.createElement(MiControl, {
    db: db,
    setDb: setDb,
    auth: auth,
    persona: g
  }), tab === "infracciones" && React.createElement(MisInfracciones, {
    db: db,
    persona: g,
    role: "guardia"
  }));
}
function domicilioMaps(p) {
  if (p.direccionMaps && p.direccionMaps.trim()) return p.direccionMaps.trim();
  if (p.direccion && p.direccion.trim()) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.direccion.trim())}`;
  return null;
}
function FichaPersona({
  p,
  unidad,
  kind
}) {
  const dm = domicilioMaps(p);
  const rows = [["Cuenta (usuario)", p.cuenta], ["Nombre completo", p.nombre], ["Cédula de Identidad", p.ci], ["Teléfono principal", p.tel1], ["Teléfono de respaldo 1", p.tel2 || "—"], ["Teléfono de respaldo 2", p.tel3 || "—"], ["Correo", p.correo], ["Departamento", p.departamento || "—"], ["Centro / Unidad", unidad ? unidad.nombre : "—"], ["Cargo", p.cargo], ["Turno", p.turno || "—"], ["Horario", p.horario]];
  if (kind === 'guardia') rows.push(["Tipo", p.tipo || "—"]);
  rows.push(["Inicio de contrato", p.ingreso || "—"], ["Fin de contrato", p.fin || "—"], ["Observaciones", p.obs || "—"]);
  return React.createElement("div", null, React.createElement("div", {
    style: {
      display: 'flex',
      padding: '9px 0',
      borderBottom: '1px solid var(--line)',
      fontSize: 14,
      alignItems: 'center'
    }
  }, React.createElement("div", {
    style: {
      width: '42%',
      color: 'var(--muted)',
      fontWeight: 600,
      fontSize: 12.5
    }
  }, "Dirección"), React.createElement("div", {
    style: {
      flex: 1,
      color: 'var(--dark)',
      fontWeight: 600
    }
  }, p.direccion || "—", dm && React.createElement(React.Fragment, null, " · ", React.createElement("a", {
    href: dm,
    target: "_blank",
    style: {
      color: 'var(--primary)',
      fontWeight: 700
    }
  }, "ver en Maps")))), rows.map(([k, v], i) => React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      padding: '9px 0',
      borderBottom: '1px solid var(--line)',
      fontSize: 14
    }
  }, React.createElement("div", {
    style: {
      width: '42%',
      color: 'var(--muted)',
      fontWeight: 600,
      fontSize: 12.5
    }
  }, k), React.createElement("div", {
    style: {
      flex: 1,
      color: 'var(--dark)',
      fontWeight: 600
    }
  }, v))), React.createElement("div", {
    style: {
      display: 'flex',
      padding: '9px 0',
      fontSize: 14,
      alignItems: 'center'
    }
  }, React.createElement("div", {
    style: {
      width: '42%',
      color: 'var(--muted)',
      fontWeight: 600,
      fontSize: 12.5
    }
  }, "Estado"), React.createElement("div", null, React.createElement(Badge, {
    tone: p.estado === 'Activo' ? 'green' : 'red'
  }, p.estado))), dm && React.createElement("a", {
    href: dm,
    target: "_blank",
    style: {
      display: 'flex',
      marginTop: 12,
      textDecoration: 'none',
      padding: '11px',
      background: 'var(--soft)',
      color: 'var(--primary)',
      borderRadius: 10,
      fontWeight: 700,
      fontSize: 14,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, React.createElement(Icon, {
    d: I.pin,
    size: 17,
    color: "var(--primary)"
  }), " Abrir ubicación del domicilio"));
}
function PersonaForm({
  db,
  kind,
  persona,
  onSave,
  onClose
}) {
  const cargoDef = kind === 'supervisor' ? "Supervisor" : kind === 'administrativo' ? "Administrativo" : "Guardia de Seguridad";
  const base = {
    nombre: "",
    ci: "",
    direccion: "",
    direccionMaps: "",
    tel1: "",
    tel2: "",
    tel3: "",
    correo: "",
    cargo: cargoDef,
    unidadId: db.unidades[0]?.id || 1,
    horario: "07:00 - 15:00",
    turno: "Diurno",
    departamento: "La Paz",
    tipo: "Fijo",
    ingreso: hoyISO(),
    fin: "",
    estado: "Activo",
    obs: ""
  };
  const [f, setF] = useState(persona || base);
  const set = (k, v) => setF(p => ({
    ...p,
    [k]: v
  }));
  const lista = kind === 'supervisor' ? db.supervisores || [] : kind === 'administrativo' ? db.administrativos || [] : db.guardias;
  const nextFn = kind === 'supervisor' ? nextSuperv : kind === 'administrativo' ? nextAdmin : nextGuardia;
  const cuentaPreview = persona ? persona.cuenta : nextFn(lista) || "— sin cupo —";
  const submit = () => {
    if (!f.nombre.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }
    onSave({
      ...f,
      unidadId: Number(f.unidadId)
    });
  };
  const nombreKind = kind === 'supervisor' ? 'supervisor' : kind === 'administrativo' ? 'administrativo' : 'guardia';
  const titulo = (persona ? "Editar " : "Nuevo ") + nombreKind;
  return React.createElement(Modal, {
    title: titulo,
    onClose: onClose
  }, React.createElement("div", {
    style: {
      background: 'var(--soft2)',
      border: '1px solid var(--line)',
      borderRadius: 11,
      padding: '12px 14px',
      marginBottom: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, React.createElement(Icon, {
    d: I.id,
    size: 22,
    color: "var(--primary)"
  }), React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      fontWeight: 600
    }
  }, "Cuenta asignada (usuario de acceso)"), React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: 'var(--primary)'
    }
  }, cuentaPreview))), React.createElement(Field, {
    label: "Nombre completo *"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.nombre,
    onChange: e => set('nombre', e.target.value)
  })), React.createElement(Field, {
    label: "Cédula de Identidad"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.ci,
    onChange: e => set('ci', e.target.value)
  })), React.createElement(Field, {
    label: "Dirección (texto)"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.direccion,
    onChange: e => set('direccion', e.target.value)
  })), React.createElement(Field, {
    label: "Enlace de Google Maps del domicilio (opcional)"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.direccionMaps,
    onChange: e => set('direccionMaps', e.target.value),
    placeholder: "https://maps.google.com/?q=..."
  })), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Tel. principal"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.tel1,
    onChange: e => set('tel1', e.target.value)
  }))), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Tel. respaldo 1"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.tel2,
    onChange: e => set('tel2', e.target.value)
  })))), React.createElement(Field, {
    label: "Tel. respaldo 2"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.tel3,
    onChange: e => set('tel3', e.target.value)
  })), React.createElement(Field, {
    label: "Correo (Gmail)"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.correo,
    onChange: e => set('correo', e.target.value)
  })), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Departamento"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.departamento,
    onChange: e => set('departamento', e.target.value)
  }, DEPARTAMENTOS.map(d => React.createElement("option", {
    key: d
  }, d))))), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Turno"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.turno,
    onChange: e => set('turno', e.target.value)
  }, React.createElement("option", null, "Diurno"), React.createElement("option", null, "Nocturno"))))), React.createElement(Field, {
    label: "Unidad / Centro"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.unidadId,
    onChange: e => set('unidadId', e.target.value)
  }, db.unidades.map(u => React.createElement("option", {
    key: u.id,
    value: u.id
  }, u.nombre)))), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Cargo"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.cargo,
    onChange: e => set('cargo', e.target.value)
  }))), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Horario"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.horario,
    onChange: e => set('horario', e.target.value),
    placeholder: "07:00 - 15:00"
  })))), kind === 'guardia' && React.createElement(Field, {
    label: "Tipo de contrato"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.tipo,
    onChange: e => set('tipo', e.target.value)
  }, React.createElement("option", null, "Fijo"), React.createElement("option", null, "Extra"))), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Inicio de contrato"
  }, React.createElement("input", {
    type: "date",
    style: inputStyle,
    value: f.ingreso,
    onChange: e => set('ingreso', e.target.value)
  }))), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Fin de contrato"
  }, React.createElement("input", {
    type: "date",
    style: inputStyle,
    value: f.fin,
    onChange: e => set('fin', e.target.value)
  })))), React.createElement(Field, {
    label: "Estado"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.estado,
    onChange: e => set('estado', e.target.value)
  }, React.createElement("option", null, "Activo"), React.createElement("option", null, "Inactivo"))), React.createElement(Field, {
    label: "Observaciones"
  }, React.createElement("textarea", {
    style: {
      ...inputStyle,
      minHeight: 60,
      resize: 'vertical'
    },
    value: f.obs,
    onChange: e => set('obs', e.target.value)
  })), React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      marginBottom: 12,
      lineHeight: 1.5
    }
  }, "La contraseña es la misma para ", kind === 'supervisor' ? 'todos los supervisores' : kind === 'administrativo' ? 'todos los administrativos' : 'todos los guardias', " y se administra en ", React.createElement("b", null, "Ajustes"), "."), React.createElement("button", {
    onClick: submit,
    style: {
      width: '100%',
      padding: '13px',
      background: 'var(--primary)',
      color: '#fff',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 15
    }
  }, "Guardar"));
}
function ListaPersonas({
  db,
  setDb,
  auth,
  kind,
  titulo
}) {
  const [edit, setEdit] = useState(null);
  const [ver, setVer] = useState(null);
  const [q, setQ] = useState("");
  const [turno, setTurno] = useState("todos");
  const arrKey = kind === 'supervisor' ? 'supervisores' : kind === 'administrativo' ? 'administrativos' : 'guardias';
  const artic = kind === 'supervisor' ? 'al supervisor' : kind === 'administrativo' ? 'al administrativo' : 'al guardia';
  const lista = (db[arrKey] || []).filter(g => {
    const t = (g.nombre + ' ' + g.ci + ' ' + g.cuenta).toLowerCase();
    return t.includes(q.toLowerCase()) && (turno === 'todos' || g.turno === turno);
  });
  const nextFn = kind === 'supervisor' ? nextSuperv : kind === 'administrativo' ? nextAdmin : nextGuardia;
  const maxN = kind === 'supervisor' ? MAX_SUPERV : kind === 'administrativo' ? MAX_ADMIN : MAX_GUARDIAS;
  const guardar = datos => {
    setDb(prev => {
      let nx, msg;
      if (datos.id) {
        nx = {
          ...prev,
          [arrKey]: prev[arrKey].map(g => g.id === datos.id ? {
            ...g,
            ...datos
          } : g)
        };
        msg = `editó ${artic} ${datos.nombre}`;
      } else {
        const cuenta = nextFn(prev[arrKey] || []);
        if (!cuenta) {
          alert("No hay cuentas disponibles (máximo " + maxN + ").");
          return prev;
        }
        const id = uid(prev);
        nx = {
          ...prev,
          [arrKey]: [...(prev[arrKey] || []), {
            ...datos,
            id,
            cuenta
          }]
        };
        msg = `registró ${artic} ${datos.nombre} (${cuenta})`;
      }
      pushNotif(nx, auth, msg);
      saveDB(nx);
      return nx;
    });
    setEdit(null);
  };
  const borrar = p => {
    if (!confirm("Al eliminar esta cuenta se borrará TODA su información (asistencia, rondas, extras e infracciones) y su cuenta quedará libre. ¿Continuar?")) return;
    setDb(prev => {
      const nx = {
        ...prev,
        [arrKey]: prev[arrKey].filter(g => g.id !== p.id),
        asistencia: prev.asistencia.filter(a => !(a.persRole === kind && a.persId === p.id)),
        rondasReg: prev.rondasReg.filter(r => !(r.persRole === kind && r.persId === p.id)),
        rondasPlan: prev.rondasPlan.filter(r => !(r.persRole === kind && r.persId === p.id)),
        extras: (prev.extras || []).filter(x => !(x.ambito === kind && (x.trabajadorId === p.id || x.reemplazaId === p.id))),
        infracciones: kind === 'guardia' || kind === 'administrativo' ? (prev.infracciones || []).filter(x => !(x.destRole === kind && x.destId === p.id)) : prev.infracciones || []
      };
      pushNotif(nx, auth, `eliminó la cuenta ${p.cuenta} (${p.nombre}) y todos sus datos`);
      saveDB(nx);
      return nx;
    });
    setVer(null);
  };
  return React.createElement(React.Fragment, null, React.createElement(SectionTitle, {
    right: React.createElement("button", {
      onClick: () => setEdit('nuevo'),
      style: {
        background: 'var(--primary)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '8px 12px',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }
    }, React.createElement(Icon, {
      d: I.plus,
      size: 16,
      color: "#fff"
    }), " Nuevo")
  }, titulo), React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Buscar por nombre, CI o cuenta…",
    style: {
      ...inputStyle,
      marginBottom: 10
    }
  }), React.createElement(ChipGroup, {
    label: "Turno",
    sel: turno === 'todos' ? [] : [turno],
    setSel: arr => setTurno(arr.length ? arr[arr.length - 1] : 'todos'),
    opciones: [{
      v: 'Diurno',
      t: 'Diurno'
    }, {
      v: 'Nocturno',
      t: 'Nocturno'
    }]
  }), lista.length === 0 && React.createElement(Empty, null, "Sin resultados."), lista.map(g => React.createElement(Card, {
    key: g.id,
    style: {
      padding: 14
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: kind === 'supervisor' ? 'var(--sup-bg)' : 'var(--soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    d: kind === 'supervisor' ? I.shield : kind === 'administrativo' ? I.id : I.user,
    size: 22,
    color: kind === 'supervisor' ? 'var(--sup)' : 'var(--primary)'
  })), React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--dark)'
    }
  }, g.nombre), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, g.cuenta, " · ", g.turno, " · ", g.departamento)), React.createElement(Badge, {
    tone: g.estado === 'Activo' ? 'green' : 'red'
  }, g.estado)), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12
    }
  }, React.createElement("button", {
    onClick: () => setVer(g),
    style: btnGhost
  }, "Ver ficha"), domicilioMaps(g) && React.createElement("a", {
    href: domicilioMaps(g),
    target: "_blank",
    style: {
      ...btnGhost,
      textDecoration: 'none',
      color: 'var(--primary)',
      flex: '0 0 auto',
      padding: '9px 12px'
    }
  }, React.createElement(Icon, {
    d: I.pin,
    size: 15,
    color: "var(--primary)"
  }), " Ubicación"), React.createElement("button", {
    onClick: () => setEdit(g),
    style: btnGhost
  }, React.createElement(Icon, {
    d: I.edit,
    size: 15
  }), " Editar")))), ver && React.createElement(Modal, {
    title: ver.nombre,
    onClose: () => setVer(null)
  }, React.createElement(FichaPersona, {
    p: ver,
    unidad: db.unidades.find(u => u.id === ver.unidadId),
    kind: kind
  }), React.createElement("button", {
    onClick: () => borrar(ver),
    style: {
      width: '100%',
      marginTop: 8,
      padding: '11px',
      background: 'var(--red-bg)',
      color: 'var(--red-t)',
      border: 'none',
      borderRadius: 10,
      fontWeight: 700,
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, React.createElement(Icon, {
    d: I.trash,
    size: 16
  }), " Eliminar cuenta y todos sus datos")), edit && React.createElement(PersonaForm, {
    db: db,
    kind: kind,
    persona: edit === 'nuevo' ? null : edit,
    onSave: guardar,
    onClose: () => setEdit(null)
  }));
}
function AdminDirectorio({
  db
}) {
  const [q, setQ] = useState("");
  const [rol, setRol] = useState([]);
  const [turno, setTurno] = useState([]);
  const [depto, setDepto] = useState([]);
  const gente = [...db.guardias.map(g => ({
    ...g,
    _rol: 'guardia'
  })), ...(db.supervisores || []).map(s => ({
    ...s,
    _rol: 'supervisor'
  })), ...(db.administrativos || []).map(a => ({
    ...a,
    _rol: 'administrativo'
  }))];
  const lista = gente.filter(g => {
    const t = (g.nombre + ' ' + g.cuenta).toLowerCase();
    return t.includes(q.toLowerCase()) && (rol.length === 0 || rol.includes(g._rol)) && (turno.length === 0 || turno.includes(g.turno)) && (depto.length === 0 || depto.includes(g.departamento));
  });
  const exportar = () => {
    exportarPDF("Directorio de personal", ["Cuenta", "Nombre", "Rol", "Turno", "Depto.", "Tel. principal", "Correo", "Centro"], lista.map(g => {
      const u = db.unidades.find(x => x.id === g.unidadId);
      return [g.cuenta, g.nombre, rolLabel(g._rol), g.turno || '—', g.departamento || '—', g.tel1, g.correo || '—', u ? u.nombre : '—'];
    }));
  };
  return React.createElement(React.Fragment, null, React.createElement(SectionTitle, {
    right: React.createElement("button", {
      onClick: exportar,
      style: {
        background: 'var(--soft)',
        color: 'var(--primary)',
        border: '1px solid var(--line)',
        borderRadius: 10,
        padding: '8px 12px',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }
    }, React.createElement(Icon, {
      d: I.pdf,
      size: 16,
      color: "var(--primary)"
    }), " PDF")
  }, "Directorio"), React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Buscar…",
    style: {
      ...inputStyle,
      marginBottom: 10
    }
  }), React.createElement(ChipGroup, {
    label: "Rol",
    sel: rol,
    setSel: setRol,
    opciones: [{
      v: 'guardia',
      t: 'Guardias'
    }, {
      v: 'supervisor',
      t: 'Supervisores'
    }, {
      v: 'administrativo',
      t: 'Administrativos'
    }]
  }), React.createElement(ChipGroup, {
    label: "Turno",
    sel: turno,
    setSel: setTurno,
    opciones: [{
      v: 'Diurno',
      t: 'Diurno'
    }, {
      v: 'Nocturno',
      t: 'Nocturno'
    }]
  }), React.createElement(ChipGroup, {
    label: "Departamento",
    sel: depto,
    setSel: setDepto,
    opciones: DEPARTAMENTOS.map(d => ({
      v: d,
      t: d
    }))
  }), lista.length === 0 && React.createElement(Empty, null, "Sin resultados."), lista.map(g => React.createElement(Card, {
    key: g._rol + g.id,
    style: {
      padding: 14
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 12
    }
  }, React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: g._rol === 'supervisor' ? 'var(--sup-bg)' : g._rol === 'administrativo' ? 'var(--amber-bg)' : 'var(--soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    d: g._rol === 'supervisor' ? I.shield : g._rol === 'administrativo' ? I.id : I.user,
    size: 22,
    color: g._rol === 'supervisor' ? 'var(--sup)' : g._rol === 'administrativo' ? 'var(--amber-t)' : 'var(--primary)'
  })), React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--dark)'
    }
  }, g.nombre, " ", g._rol === 'supervisor' && React.createElement(Badge, {
    tone: "sup"
  }, "Supervisor"), " ", g._rol === 'administrativo' && React.createElement(Badge, {
    tone: "amber"
  }, "Administrativo")), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--primary)',
      fontWeight: 700
    }
  }, g.cuenta), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, "+591 ", g.tel1, g.correo ? ` · ${g.correo}` : ''))), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement("a", {
    href: waLink(g.tel1),
    target: "_blank",
    style: {
      flex: 1,
      textDecoration: 'none',
      padding: '10px',
      background: 'var(--green-bg)',
      color: 'var(--green-t)',
      borderRadius: 10,
      fontWeight: 700,
      fontSize: 13.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, React.createElement(Icon, {
    d: I.phone,
    size: 16,
    color: "var(--green-t)"
  }), " WhatsApp"), React.createElement("a", {
    href: gmailLink(g.correo),
    target: "_blank",
    style: {
      flex: 1,
      textDecoration: 'none',
      padding: '10px',
      background: 'var(--soft)',
      color: 'var(--primary)',
      borderRadius: 10,
      fontWeight: 700,
      fontSize: 13.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      opacity: g.correo ? 1 : .4,
      pointerEvents: g.correo ? 'auto' : 'none'
    }
  }, React.createElement(Icon, {
    d: I.mail,
    size: 16,
    color: "var(--primary)"
  }), " Gmail")))));
}
function AdminUnidades({
  db,
  setDb,
  auth,
  readOnly
}) {
  const [edit, setEdit] = useState(null);
  const guardar = u => {
    setDb(prev => {
      let nx, msg;
      if (u.id) {
        nx = {
          ...prev,
          unidades: prev.unidades.map(x => x.id === u.id ? {
            ...x,
            ...u
          } : x)
        };
        msg = `editó la unidad ${u.nombre}`;
      } else {
        nx = {
          ...prev,
          unidades: [...prev.unidades, {
            ...u,
            id: uid(prev)
          }]
        };
        msg = `creó la unidad ${u.nombre}`;
      }
      pushNotif(nx, auth, msg);
      saveDB(nx);
      return nx;
    });
    setEdit(null);
  };
  const borrar = u => {
    if (!confirm("¿Eliminar esta unidad?")) return;
    setDb(prev => {
      const nx = {
        ...prev,
        unidades: prev.unidades.filter(x => x.id !== u.id)
      };
      pushNotif(nx, auth, `eliminó la unidad ${u.nombre}`);
      saveDB(nx);
      return nx;
    });
  };
  return React.createElement(React.Fragment, null, React.createElement(SectionTitle, {
    right: !readOnly && React.createElement("button", {
      onClick: () => setEdit('nuevo'),
      style: {
        background: 'var(--primary)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '8px 12px',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }
    }, React.createElement(Icon, {
      d: I.plus,
      size: 16,
      color: "#fff"
    }), " Nueva")
  }, "Unidades / Centros"), readOnly && React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)',
      margin: '-6px 2px 12px'
    }
  }, "Solo lectura de la información de los centros."), db.unidades.map(u => React.createElement(Card, {
    key: u.id
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'var(--soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    d: I.pin,
    size: 20,
    color: "var(--primary)"
  })), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--dark)'
    }
  }, u.nombre), React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--muted)'
    }
  }, u.direccion))), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12
    }
  }, u.maps && React.createElement("a", {
    href: u.maps,
    target: "_blank",
    style: {
      flex: 1,
      textDecoration: 'none',
      padding: '9px',
      background: 'var(--soft)',
      color: 'var(--primary)',
      borderRadius: 9,
      fontWeight: 700,
      fontSize: 13,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, React.createElement(Icon, {
    d: I.map,
    size: 15,
    color: "var(--primary)"
  }), " Abrir ubicación"), !readOnly && React.createElement("button", {
    onClick: () => setEdit(u),
    style: btnGhost
  }, React.createElement(Icon, {
    d: I.edit,
    size: 15
  }), " Editar"), !readOnly && React.createElement("button", {
    onClick: () => borrar(u),
    style: {
      ...btnGhost,
      flex: '0 0 44px',
      color: 'var(--red)'
    }
  }, React.createElement(Icon, {
    d: I.trash,
    size: 16
  }))))), edit && React.createElement(UnidadForm, {
    unidad: edit === 'nuevo' ? null : edit,
    onSave: guardar,
    onClose: () => setEdit(null)
  }));
}
function UnidadForm({
  unidad,
  onSave,
  onClose
}) {
  const [f, setF] = useState(unidad || {
    nombre: "",
    direccion: "",
    maps: ""
  });
  const set = (k, v) => setF(p => ({
    ...p,
    [k]: v
  }));
  return React.createElement(Modal, {
    title: unidad ? "Editar unidad" : "Nueva unidad",
    onClose: onClose
  }, React.createElement(Field, {
    label: "Nombre de la unidad *"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.nombre,
    onChange: e => set('nombre', e.target.value)
  })), React.createElement(Field, {
    label: "Dirección"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.direccion,
    onChange: e => set('direccion', e.target.value)
  })), React.createElement(Field, {
    label: "Enlace de Google Maps"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.maps,
    onChange: e => set('maps', e.target.value),
    placeholder: "https://maps.google.com/?q=..."
  })), React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      marginBottom: 14,
      lineHeight: 1.5
    }
  }, "En Google Maps: ", React.createElement("b", null, "Compartir → Copiar vínculo"), " y péguelo aquí. El botón «Abrir ubicación» lo abrirá directamente."), React.createElement("button", {
    onClick: () => {
      if (!f.nombre.trim()) {
        alert("El nombre es obligatorio");
        return;
      }
      onSave(f);
    },
    style: {
      width: '100%',
      padding: '13px',
      background: 'var(--primary)',
      color: '#fff',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 15
    }
  }, "Guardar"));
}
function AdminAsistencia({
  db,
  viewer
}) {
  const [semOff, setSemOff] = useState(0);
  const [rol, setRol] = useState([]);
  const [turno, setTurno] = useState([]);
  const [evento, setEvento] = useState([]);
  const [depto, setDepto] = useState([]);
  const [centro, setCentro] = useState([]);
  const pers = r => personaDe(db, r.persRole, r.persId);
  const centroNom = id => {
    const u = db.unidades.find(x => x.id === id);
    return u ? u.nombre : '—';
  };
  const visibles = viewer === 'admin' ? ['guardia', 'supervisor', 'administrativo', 'rrhh', 'operaciones', 'admin'] : viewer === 'rrhh' ? ['guardia', 'supervisor', 'administrativo'] : ['guardia', 'supervisor'];
  const rolTxt = {
    guardia: 'Guardias',
    supervisor: 'Supervisores',
    administrativo: 'Administrativos',
    rrhh: 'RR.HH.',
    operaciones: 'Operaciones',
    admin: 'Administración'
  };
  const rolChips = visibles.map(r => ({
    v: r,
    t: rolTxt[r]
  }));
  const sem = semanaRango(semOff);
  const regs = db.asistencia.filter(a => {
    const t = new Date(a.fechaISO);
    return t >= sem.ini && t <= sem.fin && visibles.includes(a.persRole);
  }).map(a => ({
    a,
    p: pers(a)
  })).filter(({
    a,
    p
  }) => {
    if (!p) return false;
    if (rol.length && !rol.includes(a.persRole)) return false;
    if (turno.length && !turno.includes(p.turno)) return false;
    if (depto.length && !depto.includes(p.departamento)) return false;
    if (centro.length && !centro.includes(String(p.unidadId))) return false;
    if (evento.length) {
      const ok = evento.includes('entrada') && a.tipo === 'entrada' || evento.includes('salida') && a.tipo === 'salida' || evento.includes('atraso') && esAtraso(a, p);
      if (!ok) return false;
    }
    return true;
  }).sort((x, y) => new Date(x.a.fechaISO) - new Date(y.a.fechaISO));
  const cols = ["Fecha", "Persona", "Rol", "Turno", "Depto.", "Centro", "Evento", "Hora", "Coordenadas"];
  const filas = () => regs.map(({
    a,
    p
  }) => [fmtFecha(a.fechaISO), p.nombre, rolLabel(a.persRole), p.turno || '—', p.departamento || '—', centroNom(p.unidadId), a.tipo === 'entrada' ? esAtraso(a, p) ? 'entrada (atraso)' : 'entrada' : 'salida', fmtHora(a.fechaISO), a.coords || 'sin GPS']);
  const exportar = () => exportarPDF(`Asistencia · Semana ${sem.label}`, cols, filas());
  const exportarXls = () => exportarExcel(`asistencia_semana_${sem.file}`, cols, filas());
  return React.createElement(React.Fragment, null, React.createElement(SectionTitle, {
    right: puedeExportar(viewer) && React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, React.createElement("button", {
      onClick: exportarXls,
      style: {
        background: 'var(--green-bg)',
        color: 'var(--green-t)',
        border: '1px solid #c3ddc9',
        borderRadius: 10,
        padding: '8px 10px',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, React.createElement(Icon, {
      d: I.dl,
      size: 16,
      color: "var(--green-t)"
    }), " Excel"), React.createElement("button", {
      onClick: exportar,
      style: {
        background: 'var(--soft)',
        color: 'var(--primary)',
        border: '1px solid var(--line)',
        borderRadius: 10,
        padding: '8px 10px',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, React.createElement(Icon, {
      d: I.pdf,
      size: 16,
      color: "var(--primary)"
    }), " PDF"))
  }, "Asistencia"), React.createElement(SemanaNavFiltros, {
    sem: sem,
    semOff: semOff,
    setSemOff: setSemOff
  }, React.createElement(ChipGroup, {
    label: "Rol",
    sel: rol,
    setSel: setRol,
    opciones: rolChips
  }), React.createElement(ChipGroup, {
    label: "Turno",
    sel: turno,
    setSel: setTurno,
    opciones: [{
      v: 'Diurno',
      t: 'Diurno'
    }, {
      v: 'Nocturno',
      t: 'Nocturno'
    }]
  }), React.createElement(ChipGroup, {
    label: "Evento",
    sel: evento,
    setSel: setEvento,
    opciones: [{
      v: 'entrada',
      t: 'Entrada'
    }, {
      v: 'salida',
      t: 'Salida'
    }, {
      v: 'atraso',
      t: 'Atraso'
    }]
  }), React.createElement(ChipGroup, {
    label: "Departamento",
    sel: depto,
    setSel: setDepto,
    opciones: DEPARTAMENTOS.map(d => ({
      v: d,
      t: d
    }))
  }), React.createElement(ChipGroup, {
    label: "Centro",
    sel: centro,
    setSel: setCentro,
    opciones: db.unidades.map(u => ({
      v: String(u.id),
      t: u.nombre
    }))
  })), regs.length === 0 && React.createElement(Empty, null, "Sin registros para este filtro."), regs.map(({
    a,
    p
  }) => {
    const sup = a.persRole === 'supervisor';
    const otro = a.persRole !== 'guardia' && !sup;
    const barra = sup ? 'var(--sup)' : otro ? 'var(--accent)' : 'var(--primary)';
    const atras = esAtraso(a, p);
    return React.createElement(Card, {
      key: a.id,
      style: {
        padding: 14,
        borderLeft: `4px solid ${barra}`
      }
    }, React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 10,
        background: sup ? 'var(--sup-bg)' : a.tipo === 'entrada' ? 'var(--green-bg)' : 'var(--soft2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, React.createElement(Icon, {
      d: a.tipo === 'entrada' ? I.clock : I.logout,
      size: 18,
      color: sup ? 'var(--sup)' : a.tipo === 'entrada' ? 'var(--green)' : 'var(--muted)'
    })), React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, React.createElement("div", {
      style: {
        fontWeight: 700,
        color: 'var(--dark)',
        fontSize: 14
      }
    }, p.nombre, " ", sup && React.createElement(Badge, {
      tone: "sup"
    }, "Supervisor"), otro && React.createElement(Badge, {
      tone: "blue"
    }, rolLabel(a.persRole))), React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--muted)'
      }
    }, centroNom(p.unidadId), " · ", p.turno, " · ", fmtFecha(a.fechaISO), " ", fmtHora(a.fechaISO))), React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        alignItems: 'flex-end'
      }
    }, React.createElement(Badge, {
      tone: a.tipo === 'entrada' ? 'green' : 'gray'
    }, a.tipo), atras && React.createElement(Badge, {
      tone: "red"
    }, "Atraso"))), a.maps && React.createElement("a", {
      href: a.maps,
      target: "_blank",
      style: {
        display: 'inline-block',
        marginTop: 8,
        fontSize: 12.5,
        color: 'var(--primary)',
        fontWeight: 700,
        textDecoration: 'none'
      }
    }, "abrir ubicación →"));
  }));
}
function AdminRondas({
  db,
  viewer
}) {
  const [semOff, setSemOff] = useState(0);
  const [rol, setRol] = useState([]);
  const [turno, setTurno] = useState([]);
  const [depto, setDepto] = useState([]);
  const [centro, setCentro] = useState([]);
  const pers = r => personaDe(db, r.persRole, r.persId);
  const centroNom = id => {
    const u = db.unidades.find(x => x.id === id);
    return u ? u.nombre : '—';
  };
  const sem = semanaRango(semOff);
  const regs = db.rondasReg.filter(r => {
    const t = new Date(r.fechaISO);
    return t >= sem.ini && t <= sem.fin;
  }).map(r => ({
    r,
    p: pers(r)
  })).filter(({
    r,
    p
  }) => {
    if (!p) return false;
    if (rol.length && !rol.includes(r.persRole)) return false;
    if (turno.length && !turno.includes(p.turno)) return false;
    if (depto.length && !depto.includes(p.departamento)) return false;
    if (centro.length && !centro.includes(String(p.unidadId))) return false;
    return true;
  }).sort((x, y) => new Date(x.r.fechaISO) - new Date(y.r.fechaISO));
  const cols = ["Fecha", "Persona", "Rol", "Turno", "Depto.", "Centro", "Punto", "Hora", "Coordenadas"];
  const filas = () => regs.map(({
    r,
    p
  }) => [fmtFecha(r.fechaISO), p.nombre, rolLabel(r.persRole), p.turno || '—', p.departamento || '—', centroNom(p.unidadId), r.punto, fmtHora(r.fechaISO), r.coords || 'sin GPS']);
  const exportar = () => exportarPDF(`Rondas · Semana ${sem.label}`, cols, filas());
  const exportarXls = () => exportarExcel(`rondas_semana_${sem.file}`, cols, filas());
  return React.createElement(React.Fragment, null, React.createElement(SectionTitle, {
    right: puedeExportar(viewer) && React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, React.createElement("button", {
      onClick: exportarXls,
      style: {
        background: 'var(--green-bg)',
        color: 'var(--green-t)',
        border: '1px solid #c3ddc9',
        borderRadius: 10,
        padding: '8px 10px',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, React.createElement(Icon, {
      d: I.dl,
      size: 16,
      color: "var(--green-t)"
    }), " Excel"), React.createElement("button", {
      onClick: exportar,
      style: {
        background: 'var(--soft)',
        color: 'var(--primary)',
        border: '1px solid var(--line)',
        borderRadius: 10,
        padding: '8px 10px',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, React.createElement(Icon, {
      d: I.pdf,
      size: 16,
      color: "var(--primary)"
    }), " PDF"))
  }, "Rondas de control"), React.createElement(SemanaNavFiltros, {
    sem: sem,
    semOff: semOff,
    setSemOff: setSemOff
  }, React.createElement(ChipGroup, {
    label: "Rol",
    sel: rol,
    setSel: setRol,
    opciones: [{
      v: 'guardia',
      t: 'Guardias'
    }, {
      v: 'supervisor',
      t: 'Supervisores'
    }]
  }), React.createElement(ChipGroup, {
    label: "Turno",
    sel: turno,
    setSel: setTurno,
    opciones: [{
      v: 'Diurno',
      t: 'Diurno'
    }, {
      v: 'Nocturno',
      t: 'Nocturno'
    }]
  }), React.createElement(ChipGroup, {
    label: "Departamento",
    sel: depto,
    setSel: setDepto,
    opciones: DEPARTAMENTOS.map(d => ({
      v: d,
      t: d
    }))
  }), React.createElement(ChipGroup, {
    label: "Centro",
    sel: centro,
    setSel: setCentro,
    opciones: db.unidades.map(u => ({
      v: String(u.id),
      t: u.nombre
    }))
  })), regs.length === 0 && React.createElement(Empty, null, "Sin rondas registradas para este filtro."), regs.map(({
    r,
    p
  }) => {
    const sup = r.persRole === 'supervisor';
    return React.createElement(Card, {
      key: r.id,
      style: {
        padding: 14,
        borderLeft: `4px solid ${sup ? 'var(--sup)' : 'var(--primary)'}`
      }
    }, React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 10,
        background: sup ? 'var(--sup-bg)' : 'var(--soft)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, React.createElement(Icon, {
      d: I.route,
      size: 18,
      color: sup ? 'var(--sup)' : 'var(--primary)'
    })), React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, React.createElement("div", {
      style: {
        fontWeight: 700,
        color: 'var(--dark)',
        fontSize: 14
      }
    }, r.punto), React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--muted)'
      }
    }, p.nombre, " · ", centroNom(p.unidadId), " · ", fmtFecha(r.fechaISO), " ", fmtHora(r.fechaISO))), sup ? React.createElement(Badge, {
      tone: "sup"
    }, "Supervisor") : React.createElement(Badge, {
      tone: "green"
    }, "OK")), r.maps && React.createElement("a", {
      href: r.maps,
      target: "_blank",
      style: {
        display: 'inline-block',
        marginTop: 8,
        fontSize: 12.5,
        color: 'var(--primary)',
        fontWeight: 700,
        textDecoration: 'none'
      }
    }, "abrir ubicación →"));
  }));
}
function AdminExtras({
  db,
  setDb,
  auth,
  soloSupervisor
}) {
  const [edit, setEdit] = useState(null);
  const [amb, setAmb] = useState(soloSupervisor ? ['supervisor'] : []);
  const centroNom = id => {
    const u = db.unidades.find(x => x.id === id);
    return u ? u.nombre : '—';
  };
  const persNom = (ambito, id) => {
    const p = ambito === 'supervisor' ? (db.supervisores || []).find(x => x.id === id) : db.guardias.find(x => x.id === id);
    return p ? p.nombre : '—';
  };
  const lista = (db.extras || []).filter(x => soloSupervisor ? x.ambito === 'supervisor' : amb.length === 0 || amb.includes(x.ambito)).sort((a, b) => (b.fechaISO || '').localeCompare(a.fechaISO || ''));
  const guardar = x => {
    setDb(prev => {
      let nx, msg;
      if (x.id) {
        nx = {
          ...prev,
          extras: prev.extras.map(e => e.id === x.id ? {
            ...e,
            ...x
          } : e)
        };
        msg = `editó un turno extra de ${persNom(x.ambito, x.trabajadorId)}`;
      } else {
        nx = {
          ...prev,
          extras: [...(prev.extras || []), {
            ...x,
            id: uid(prev)
          }]
        };
        msg = `registró turno extra: ${persNom(x.ambito, x.trabajadorId)} cubrió a ${persNom(x.ambito, x.reemplazaId)}`;
      }
      pushNotif(nx, auth, msg);
      saveDB(nx);
      return nx;
    });
    setEdit(null);
  };
  const borrar = x => {
    if (!confirm("¿Eliminar este registro de extra?")) return;
    setDb(prev => {
      const nx = {
        ...prev,
        extras: prev.extras.filter(e => e.id !== x.id)
      };
      pushNotif(nx, auth, `eliminó un turno extra`);
      saveDB(nx);
      return nx;
    });
  };
  const exportar = () => {
    exportarPDF("Registro de turnos extra", ["Fecha", "Ámbito", "Trabajó el extra", "Reemplazó a", "Puesto/Centro", "Horario", "Compensación", "Estado"], lista.map(x => [x.fechaISO, x.ambito === 'supervisor' ? 'Supervisores' : 'Guardias', persNom(x.ambito, x.trabajadorId), persNom(x.ambito, x.reemplazaId), (x.puesto ? x.puesto + ' · ' : '') + centroNom(x.unidadId), x.horario || '—', x.compensacion || '—', x.estadoPago || '—']));
  };
  return React.createElement(React.Fragment, null, React.createElement(SectionTitle, {
    right: React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, puedeExportar(auth.role) && React.createElement("button", {
      onClick: exportar,
      style: {
        background: 'var(--soft)',
        color: 'var(--primary)',
        border: '1px solid var(--line)',
        borderRadius: 10,
        padding: '8px 10px',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, React.createElement(Icon, {
      d: I.pdf,
      size: 16,
      color: "var(--primary)"
    }), " PDF"), React.createElement("button", {
      onClick: () => setEdit('nuevo'),
      style: {
        background: 'var(--primary)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '8px 12px',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }
    }, React.createElement(Icon, {
      d: I.plus,
      size: 16,
      color: "#fff"
    }), " Extra"))
  }, "Turnos extra"), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)',
      margin: '-6px 2px 12px'
    }
  }, "Registro de horas extra: quién las cubrió, a quién reemplazó, y si se paga o se compensa con permiso (para fijos). Sirve para descontar al ausente y pagar al extra."), !soloSupervisor && React.createElement(ChipGroup, {
    label: "Ámbito",
    sel: amb,
    setSel: setAmb,
    opciones: [{
      v: 'guardia',
      t: 'Guardias'
    }, {
      v: 'supervisor',
      t: 'Supervisores'
    }]
  }), lista.length === 0 && React.createElement(Empty, null, "Sin turnos extra registrados."), lista.map(x => React.createElement(Card, {
    key: x.id,
    style: {
      borderLeft: `4px solid ${x.ambito === 'supervisor' ? 'var(--sup)' : 'var(--primary)'}`
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 8
    }
  }, React.createElement(Icon, {
    d: I.swap,
    size: 20,
    color: x.ambito === 'supervisor' ? 'var(--sup)' : 'var(--primary)'
  }), React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 800,
      color: 'var(--dark)',
      fontSize: 14.5
    }
  }, persNom(x.ambito, x.trabajadorId)), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, "cubrió a ", React.createElement("b", null, persNom(x.ambito, x.reemplazaId)))), React.createElement(Badge, {
    tone: x.ambito === 'supervisor' ? 'sup' : 'blue'
  }, x.ambito === 'supervisor' ? 'Superv.' : 'Guardia')), React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--body)',
      lineHeight: 1.7,
      borderTop: '1px solid var(--line)',
      paddingTop: 8
    }
  }, React.createElement("div", null, React.createElement("b", null, "Fecha:"), " ", x.fechaISO, " · ", React.createElement("b", null, "Horario:"), " ", x.horario || '—'), React.createElement("div", null, React.createElement("b", null, "Puesto:"), " ", x.puesto ? x.puesto + ' · ' : '', centroNom(x.unidadId)), React.createElement("div", null, React.createElement("b", null, "Compensación:"), " ", x.compensacion || '—', " ", x.compensacion === 'Pago' && x.estadoPago ? `(${x.estadoPago})` : '', x.monto ? ` · Bs ${x.monto}` : ''), x.obs && React.createElement("div", null, React.createElement("b", null, "Obs:"), " ", x.obs)), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12
    }
  }, React.createElement("button", {
    onClick: () => setEdit(x),
    style: btnGhost
  }, React.createElement(Icon, {
    d: I.edit,
    size: 15
  }), " Editar"), React.createElement("button", {
    onClick: () => borrar(x),
    style: {
      ...btnGhost,
      flex: '0 0 44px',
      color: 'var(--red)'
    }
  }, React.createElement(Icon, {
    d: I.trash,
    size: 16
  }))))), edit && React.createElement(ExtraForm, {
    db: db,
    extra: edit === 'nuevo' ? null : edit,
    soloSupervisor: soloSupervisor,
    onSave: guardar,
    onClose: () => setEdit(null)
  }));
}
function ExtraForm({
  db,
  extra,
  soloSupervisor,
  onSave,
  onClose
}) {
  const [f, setF] = useState(extra || {
    ambito: soloSupervisor ? 'supervisor' : 'guardia',
    trabajadorId: '',
    reemplazaId: '',
    unidadId: db.unidades[0]?.id || 1,
    puesto: '',
    horario: '',
    fechaISO: hoyISO(),
    compensacion: 'Pago',
    estadoPago: 'Pendiente',
    monto: '',
    obs: ''
  });
  const set = (k, v) => setF(p => ({
    ...p,
    [k]: v
  }));
  const gente = f.ambito === 'supervisor' ? db.supervisores || [] : db.guardias;
  const submit = () => {
    if (!f.trabajadorId) {
      alert("Seleccione quién hizo el extra.");
      return;
    }
    if (!f.reemplazaId) {
      alert("Seleccione a quién reemplazó.");
      return;
    }
    onSave({
      ...f,
      trabajadorId: Number(f.trabajadorId),
      reemplazaId: Number(f.reemplazaId),
      unidadId: Number(f.unidadId)
    });
  };
  return React.createElement(Modal, {
    title: extra ? "Editar turno extra" : "Nuevo turno extra",
    onClose: onClose
  }, !soloSupervisor && React.createElement(Field, {
    label: "Ámbito"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.ambito,
    onChange: e => {
      set('ambito', e.target.value);
      set('trabajadorId', '');
      set('reemplazaId', '');
    }
  }, React.createElement("option", {
    value: "guardia"
  }, "Guardias"), React.createElement("option", {
    value: "supervisor"
  }, "Supervisores"))), React.createElement(Field, {
    label: "¿Quién trabajó el extra? *"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.trabajadorId,
    onChange: e => set('trabajadorId', e.target.value)
  }, React.createElement("option", {
    value: ""
  }, "— Seleccione —"), gente.filter(p => p.estado === 'Activo').map(p => React.createElement("option", {
    key: p.id,
    value: p.id
  }, p.nombre, " (", p.cuenta, ")", p.tipo ? ` · ${p.tipo}` : '')))), React.createElement(Field, {
    label: "¿A quién reemplazó? (se le descuenta) *"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.reemplazaId,
    onChange: e => set('reemplazaId', e.target.value)
  }, React.createElement("option", {
    value: ""
  }, "— Seleccione —"), gente.map(p => React.createElement("option", {
    key: p.id,
    value: p.id
  }, p.nombre, " (", p.cuenta, ")")))), React.createElement(Field, {
    label: "Puesto / cargo cubierto"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.puesto,
    onChange: e => set('puesto', e.target.value),
    placeholder: "Ej: Puerta principal"
  })), React.createElement(Field, {
    label: "Centro / Unidad"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.unidadId,
    onChange: e => set('unidadId', e.target.value)
  }, db.unidades.map(u => React.createElement("option", {
    key: u.id,
    value: u.id
  }, u.nombre)))), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Fecha"
  }, React.createElement("input", {
    type: "date",
    style: inputStyle,
    value: f.fechaISO,
    onChange: e => set('fechaISO', e.target.value)
  }))), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Horario"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.horario,
    onChange: e => set('horario', e.target.value),
    placeholder: "07:00 - 15:00"
  })))), React.createElement(Field, {
    label: "Compensación al trabajador"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.compensacion,
    onChange: e => set('compensacion', e.target.value)
  }, React.createElement("option", {
    value: "Pago"
  }, "Pago del extra"), React.createElement("option", {
    value: "Permiso"
  }, "Permiso otro día (para fijos)"))), f.compensacion === 'Pago' && React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Estado del pago"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.estadoPago,
    onChange: e => set('estadoPago', e.target.value)
  }, React.createElement("option", null, "Pendiente"), React.createElement("option", null, "Pagado")))), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Monto (Bs, opcional)"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.monto,
    onChange: e => set('monto', e.target.value),
    inputMode: "decimal"
  })))), React.createElement(Field, {
    label: "Observaciones"
  }, React.createElement("textarea", {
    style: {
      ...inputStyle,
      minHeight: 54,
      resize: 'vertical'
    },
    value: f.obs,
    onChange: e => set('obs', e.target.value)
  })), React.createElement("button", {
    onClick: submit,
    style: {
      width: '100%',
      padding: '13px',
      background: 'var(--primary)',
      color: '#fff',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 15
    }
  }, "Guardar"));
}
function AdminInfracciones({
  db,
  setDb,
  auth
}) {
  const [edit, setEdit] = useState(null);
  const [q, setQ] = useState("");
  const dNom = x => {
    const p = personaDe(db, x.destRole, x.destId);
    return p ? p.nombre : '—';
  };
  const dCuenta = x => {
    const p = personaDe(db, x.destRole, x.destId);
    return p ? p.cuenta : '—';
  };
  const lista = (db.infracciones || []).filter(x => (dNom(x) + ' ' + x.concepto).toLowerCase().includes(q.toLowerCase())).sort((a, b) => new Date(b.createdISO) - new Date(a.createdISO));
  const notificarCorreo = x => {
    const p = personaDe(db, x.destRole, x.destId);
    const su = `Infracción / comunicado — ${p ? p.nombre : ''} (${p ? p.cuenta : ''})`;
    const body = `Destinatario: ${p ? p.nombre : ''} (${p ? p.cuenta : ''}) · ${rolLabel(x.destRole)}\nConcepto: ${x.concepto}\nInforme: ${x.detalle}\nFecha del hecho: ${x.fechaEvento} ${x.horaEvento || ''}\n\nEmitido por: ${x.emisorNombre} (${rolLabel(x.emisorRole)} · ${x.emisorCuenta})\nRegistrado: ${fmtFH(x.createdISO)}`;
    const dest = db.notifyEmail || p && p.correo || "";
    if (!dest) {
      alert("No hay correo asignado. El administrador debe configurarlo en Ajustes.");
      return;
    }
    window.open(gmailLink(dest, su, body), '_blank');
  };
  const guardar = x => {
    let creada = null;
    setDb(prev => {
      const nueva = {
        ...x,
        id: uid(prev),
        emisorRole: auth.role,
        emisorCuenta: auth.usuario,
        emisorNombre: auth.nombre,
        createdISO: new Date().toISOString()
      };
      creada = nueva;
      const nx = {
        ...prev,
        infracciones: [...(prev.infracciones || []), nueva]
      };
      pushNotif(nx, auth, `emitió una infracción a ${personaDe(nx, x.destRole, x.destId)?.nombre || '—'}: ${x.concepto}`);
      saveDB(nx);
      return nx;
    });
    setEdit(null);
    setTimeout(() => {
      if (creada) notificarCorreo(creada);
    }, 120);
  };
  const borrar = x => {
    if (!confirm("¿Eliminar esta infracción?")) return;
    setDb(prev => {
      const nx = {
        ...prev,
        infracciones: prev.infracciones.filter(i => i.id !== x.id)
      };
      pushNotif(nx, auth, `eliminó una infracción de ${dNom(x)}`);
      saveDB(nx);
      return nx;
    });
  };
  return React.createElement(React.Fragment, null, React.createElement(SectionTitle, {
    right: React.createElement("button", {
      onClick: () => setEdit('nuevo'),
      style: {
        background: 'var(--primary)',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '8px 12px',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }
    }, React.createElement(Icon, {
      d: I.plus,
      size: 16,
      color: "#fff"
    }), " Nueva")
  }, "Infracciones y comunicados"), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)',
      margin: '-6px 2px 12px'
    }
  }, "Comunicados dirigidos a cada guardia o administrativo. Solo el destinatario ve las suyas. Al registrar se abre el correo de notificación al correo asignado."), !db.notifyEmail && React.createElement(Card, {
    style: {
      background: 'var(--amber-bg)',
      border: '1px solid #e4d3a6',
      color: 'var(--amber-t)',
      fontSize: 12.5,
      fontWeight: 600
    }
  }, "⚠ No hay correo de notificación configurado. Pídale al administrador que lo defina en Ajustes para que las notificaciones se envíen al correo asignado."), React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Buscar por persona o concepto…",
    style: {
      ...inputStyle,
      marginBottom: 12
    }
  }), lista.length === 0 && React.createElement(Empty, null, "Sin infracciones registradas."), lista.map(x => React.createElement(Card, {
    key: x.id,
    style: {
      borderLeft: '4px solid var(--red)'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 6
    }
  }, React.createElement(Icon, {
    d: I.alert,
    size: 20,
    color: "var(--red)"
  }), React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, x.concepto), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, dNom(x), " · ", dCuenta(x), " · ", rolLabel(x.destRole)))), React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--body)',
      lineHeight: 1.5,
      marginBottom: 8,
      whiteSpace: 'pre-wrap'
    }
  }, x.detalle), React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      lineHeight: 1.6,
      borderTop: '1px solid var(--line)',
      paddingTop: 8
    }
  }, React.createElement("div", null, React.createElement("b", null, "Hecho:"), " ", x.fechaEvento, " ", x.horaEvento || '', " · ", React.createElement("b", null, "Emitió:"), " ", x.emisorNombre, " (", rolLabel(x.emisorRole), " · ", x.emisorCuenta, ")"), React.createElement("div", null, React.createElement("b", null, "Registrado:"), " ", fmtFH(x.createdISO))), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12
    }
  }, React.createElement("button", {
    onClick: () => notificarCorreo(x),
    style: {
      ...btnGhost,
      color: 'var(--primary)'
    }
  }, React.createElement(Icon, {
    d: I.mail,
    size: 15,
    color: "var(--primary)"
  }), " Notificar por correo"), React.createElement("button", {
    onClick: () => borrar(x),
    style: {
      ...btnGhost,
      flex: '0 0 44px',
      color: 'var(--red)'
    }
  }, React.createElement(Icon, {
    d: I.trash,
    size: 16
  }))))), edit && React.createElement(InfraccionForm, {
    db: db,
    onSave: guardar,
    onClose: () => setEdit(null)
  }));
}
function InfraccionForm({
  db,
  onSave,
  onClose
}) {
  const [f, setF] = useState({
    destRole: 'guardia',
    destId: '',
    concepto: '',
    detalle: '',
    fechaEvento: hoyISO(),
    horaEvento: new Date().toTimeString().slice(0, 5)
  });
  const set = (k, v) => setF(p => ({
    ...p,
    [k]: v
  }));
  const gente = f.destRole === 'administrativo' ? db.administrativos || [] : db.guardias;
  const submit = () => {
    if (!f.destId) {
      alert("Seleccione al destinatario.");
      return;
    }
    if (!f.concepto.trim()) {
      alert("Ingrese el concepto.");
      return;
    }
    if (!f.detalle.trim()) {
      alert("Ingrese el informe/detalle.");
      return;
    }
    onSave({
      ...f,
      destId: Number(f.destId)
    });
  };
  return React.createElement(Modal, {
    title: "Nueva infracción / comunicado",
    onClose: onClose
  }, React.createElement(Field, {
    label: "Tipo de destinatario *"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.destRole,
    onChange: e => {
      set('destRole', e.target.value);
      set('destId', '');
    }
  }, React.createElement("option", {
    value: "guardia"
  }, "Guardia"), React.createElement("option", {
    value: "administrativo"
  }, "Administrativo"))), React.createElement(Field, {
    label: "Destinatario *"
  }, React.createElement("select", {
    style: inputStyle,
    value: f.destId,
    onChange: e => set('destId', e.target.value)
  }, React.createElement("option", {
    value: ""
  }, "— Seleccione —"), gente.map(g => React.createElement("option", {
    key: g.id,
    value: g.id
  }, g.nombre, " (", g.cuenta, ")")))), React.createElement(Field, {
    label: "Concepto *"
  }, React.createElement("input", {
    style: inputStyle,
    value: f.concepto,
    onChange: e => set('concepto', e.target.value),
    placeholder: "Ej: Atraso reiterado / Abandono de puesto"
  })), React.createElement(Field, {
    label: "Informe *"
  }, React.createElement("textarea", {
    style: {
      ...inputStyle,
      minHeight: 90,
      resize: 'vertical'
    },
    value: f.detalle,
    onChange: e => set('detalle', e.target.value),
    placeholder: "Describa lo ocurrido…"
  })), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Día del hecho"
  }, React.createElement("input", {
    type: "date",
    style: inputStyle,
    value: f.fechaEvento,
    onChange: e => set('fechaEvento', e.target.value)
  }))), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Field, {
    label: "Hora del hecho"
  }, React.createElement("input", {
    type: "time",
    style: inputStyle,
    value: f.horaEvento,
    onChange: e => set('horaEvento', e.target.value)
  })))), React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      marginBottom: 12,
      lineHeight: 1.5
    }
  }, "Al guardar se abrirá el correo (Gmail) hacia el ", React.createElement("b", null, "correo asignado"), " con la cuenta y nombre de quien emite, la hora y la fecha."), React.createElement("button", {
    onClick: submit,
    style: {
      width: '100%',
      padding: '13px',
      background: 'var(--primary)',
      color: '#fff',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 15
    }
  }, "Guardar y notificar"));
}
function Dashboard({
  db,
  auth,
  showActividad
}) {
  const hoy = hoyISO();
  const mes = mesActual();
  const activos = db.guardias.filter(g => g.estado === 'Activo').length;
  const unidades = db.unidades.length;
  const asHoy = db.asistencia.filter(a => a.fechaISO.slice(0, 10) === hoy);
  const ingresos = asHoy.filter(a => a.tipo === 'entrada').length;
  const salidas = asHoy.filter(a => a.tipo === 'salida').length;
  const atrasos = asHoy.filter(a => a.tipo === 'entrada' && esAtraso(a, personaDe(db, a.persRole, a.persId))).length;
  const altas = db.guardias.filter(g => (g.ingreso || '').slice(0, 7) === mes).length;
  const bajas = db.guardias.filter(g => (g.fin || '').slice(0, 7) === mes).length;
  const enviarResumen = () => {
    if (!db.notifyEmail) {
      alert("Configure el correo de notificación en Ajustes.");
      return;
    }
    const su = `Resumen de actividad · ${fmtFecha(hoy + 'T00:00')}`;
    const lines = (db.notifs || []).slice(0, 25).map(n => `• ${fmtFH(n.fechaISO)} — ${n.actorNombre} (${rolLabel(n.actorRole)} · ${n.actorCuenta}) ${n.texto}`).join('\n');
    const body = `Guardias activos: ${activos}\nUnidades: ${unidades}\nHoy — Ingresos: ${ingresos} · Salidas: ${salidas} · Atrasos: ${atrasos}\nMes — Altas: ${altas} · Bajas: ${bajas}\n\nActividad reciente:\n${lines || '—'}`;
    window.open(gmailLink(db.notifyEmail, su, body), '_blank');
  };
  return React.createElement(React.Fragment, null, React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginBottom: 14
    }
  }, React.createElement(Card, {
    style: {
      marginBottom: 0,
      padding: 16
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6
    }
  }, React.createElement(Icon, {
    d: I.user,
    size: 18,
    color: "var(--primary)"
  }), React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--muted)',
      fontWeight: 700
    }
  }, "Guardias activos")), React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, activos)), React.createElement(Card, {
    style: {
      marginBottom: 0,
      padding: 16
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6
    }
  }, React.createElement(Icon, {
    d: I.map,
    size: 18,
    color: "var(--primary)"
  }), React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--muted)',
      fontWeight: 700
    }
  }, "Unidades")), React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, unidades))), React.createElement(Card, null, React.createElement("div", {
    style: {
      fontWeight: 800,
      color: 'var(--dark)',
      marginBottom: 12
    }
  }, "Actividad de hoy"), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 8,
      textAlign: 'center'
    }
  }, React.createElement("div", {
    style: {
      background: 'var(--green-bg)',
      borderRadius: 12,
      padding: '12px 6px'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: 'var(--green-t)'
    }
  }, ingresos), React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--green-t)',
      fontWeight: 700
    }
  }, "Ingresos")), React.createElement("div", {
    style: {
      background: 'var(--soft2)',
      borderRadius: 12,
      padding: '12px 6px'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: 'var(--primary)'
    }
  }, salidas), React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--primary)',
      fontWeight: 700
    }
  }, "Salidas")), React.createElement("div", {
    style: {
      background: 'var(--red-bg)',
      borderRadius: 12,
      padding: '12px 6px'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: 'var(--red-t)'
    }
  }, atrasos), React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--red-t)',
      fontWeight: 700
    }
  }, "Atrasos")))), React.createElement(Card, null, React.createElement("div", {
    style: {
      fontWeight: 800,
      color: 'var(--dark)',
      marginBottom: 4
    }
  }, "Movimiento del mes"), React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      marginBottom: 12
    }
  }, "Según inicio y fin de contrato en la información de cada guardia."), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8,
      textAlign: 'center'
    }
  }, React.createElement("div", {
    style: {
      background: 'var(--green-bg)',
      borderRadius: 12,
      padding: '14px 6px'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      color: 'var(--green-t)'
    }
  }, altas), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--green-t)',
      fontWeight: 700
    }
  }, "Altas (inician)")), React.createElement("div", {
    style: {
      background: 'var(--red-bg)',
      borderRadius: 12,
      padding: '14px 6px'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      color: 'var(--red-t)'
    }
  }, bajas), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--red-t)',
      fontWeight: 700
    }
  }, "Bajas (dejan)")))), showActividad && React.createElement(Card, null, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, React.createElement(Icon, {
    d: I.bell,
    size: 18,
    color: "var(--primary)"
  }), React.createElement("span", {
    style: {
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, "Actividad reciente")), React.createElement("button", {
    onClick: enviarResumen,
    style: {
      background: 'var(--soft)',
      color: 'var(--primary)',
      border: '1px solid var(--line)',
      borderRadius: 9,
      padding: '6px 10px',
      fontWeight: 700,
      fontSize: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, React.createElement(Icon, {
    d: I.mail,
    size: 14,
    color: "var(--primary)"
  }), " Enviar por correo")), (db.notifs || []).length === 0 && React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--muted)'
    }
  }, "Sin actividad registrada aún."), (db.notifs || []).slice(0, 12).map(n => React.createElement("div", {
    key: n.id,
    style: {
      padding: '8px 0',
      borderBottom: '1px solid var(--line)',
      fontSize: 12.5
    }
  }, React.createElement("div", {
    style: {
      color: 'var(--dark)'
    }
  }, React.createElement("b", null, n.actorNombre), " ", React.createElement("span", {
    style: {
      color: 'var(--muted)'
    }
  }, "(", rolLabel(n.actorRole), " · ", n.actorCuenta, ")"), " ", n.texto), React.createElement("div", {
    style: {
      color: 'var(--muted)',
      fontSize: 11,
      marginTop: 1
    }
  }, fmtFH(n.fechaISO))))));
}
function Segmented({
  options,
  value,
  onChange
}) {
  return React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 14,
      background: 'var(--soft2)',
      padding: 4,
      borderRadius: 12
    }
  }, options.map(([k, l]) => React.createElement("button", {
    key: k,
    onClick: () => onChange(k),
    style: {
      flex: 1,
      padding: '10px',
      borderRadius: 9,
      border: 'none',
      fontWeight: 700,
      fontSize: 13.5,
      background: value === k ? '#fff' : 'transparent',
      color: value === k ? 'var(--primary)' : 'var(--muted)',
      boxShadow: value === k ? '0 1px 4px rgba(0,0,0,.08)' : 'none'
    }
  }, l)));
}
function MiControl({
  db,
  setDb,
  auth,
  persona,
  soloAsistencia
}) {
  const [sub, setSub] = useState('asistencia');
  if (soloAsistencia) return React.createElement(AutoAsistencia, {
    db: db,
    setDb: setDb,
    auth: auth,
    persona: persona
  });
  return React.createElement(React.Fragment, null, React.createElement(Segmented, {
    options: [['asistencia', 'Ingreso / Salida'], ['ronda', 'Ronda de control']],
    value: sub,
    onChange: setSub
  }), sub === 'asistencia' && React.createElement(AutoAsistencia, {
    db: db,
    setDb: setDb,
    auth: auth,
    persona: persona
  }), sub === 'ronda' && React.createElement(AutoRonda, {
    db: db,
    setDb: setDb,
    auth: auth,
    persona: persona
  }));
}
function PersonalPanel({
  db,
  setDb,
  auth,
  showAdministrativos = true,
  showExtras = true
}) {
  const [k, setK] = useState('guardia');
  const options = [['guardia', 'Guardias'], ['supervisor', 'Supervisores']];
  if (showAdministrativos) options.push(['administrativo', 'Administrativos']);
  if (showExtras) options.push(['extras', 'Extras']);
  return React.createElement(React.Fragment, null, React.createElement(Segmented, {
    options: options,
    value: k,
    onChange: setK
  }), k === 'guardia' && React.createElement(ListaPersonas, {
    db: db,
    setDb: setDb,
    auth: auth,
    kind: "guardia",
    titulo: "Guardias"
  }), k === 'supervisor' && React.createElement(ListaPersonas, {
    db: db,
    setDb: setDb,
    auth: auth,
    kind: "supervisor",
    titulo: "Supervisores"
  }), k === 'administrativo' && showAdministrativos && React.createElement(ListaPersonas, {
    db: db,
    setDb: setDb,
    auth: auth,
    kind: "administrativo",
    titulo: "Administrativos"
  }), k === 'extras' && showExtras && React.createElement(AdminExtras, {
    db: db,
    setDb: setDb,
    auth: auth
  }));
}
function PlanillasPanel({
  db,
  viewer
}) {
  const [k, setK] = useState('asistencia');
  return React.createElement(React.Fragment, null, React.createElement(Segmented, {
    options: [['asistencia', 'Asistencia'], ['rondas', 'Rondas']],
    value: k,
    onChange: setK
  }), k === 'asistencia' && React.createElement(AdminAsistencia, {
    db: db,
    viewer: viewer
  }), k === 'rondas' && React.createElement(AdminRondas, {
    db: db,
    viewer: viewer
  }));
}
function BackupPanel({
  db,
  setDb,
  auth
}) {
  const [msg, setMsg] = useState(null);
  const descargar = () => {
    const blob = new Blob([JSON.stringify(db, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `respaldo-sefiess-${hoyISO()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  const restaurar = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!confirm("¿Reemplazar TODA la información actual por la de este archivo de respaldo? Esta acción no se puede deshacer.")) return;
        const nx = {
          ...seed(),
          ...data
        };
        pushNotif(nx, auth, "restauró un respaldo desde un archivo");
        saveDB(nx);
        setDb(nx);
        setMsg("Respaldo restaurado correctamente.");
        setTimeout(() => setMsg(null), 3000);
      } catch (err) {
        alert("El archivo no es un respaldo válido (debe ser el .json descargado desde aquí).");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };
  return React.createElement(Card, null, React.createElement("div", {
    style: {
      fontWeight: 800,
      color: "var(--dark)",
      marginBottom: 6
    }
  }, "Respaldo de información"), React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--muted)",
      marginBottom: 12,
      lineHeight: 1.5
    }
  }, "Descarga una copia completa de todos los datos (guardias, asistencia, rondas, infracciones, etc.) en un archivo .json. Guárdalo en tu correo, Google Drive o donde prefieras, aparte de la nube de Firebase. Se recomienda hacerlo cada cierto tiempo."), React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, React.createElement("button", {
    onClick: descargar,
    style: {
      background: "var(--primary)",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "10px 14px",
      fontWeight: 700,
      fontSize: 13.5,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, React.createElement(Icon, {
    d: I.download,
    size: 16,
    color: "#fff"
  }), " Descargar respaldo"), React.createElement("label", {
    style: {
      background: "var(--soft)",
      color: "var(--primary)",
      border: "1px solid var(--line)",
      borderRadius: 10,
      padding: "10px 14px",
      fontWeight: 700,
      fontSize: 13.5,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, React.createElement(Icon, {
    d: I.upload,
    size: 16,
    color: "var(--primary)"
  }), " Restaurar desde archivo", React.createElement("input", {
    type: "file",
    accept: "application/json",
    onChange: restaurar,
    style: {
      display: "none"
    }
  }))), msg && React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 12.5,
      color: "var(--green-t)",
      fontWeight: 700
    }
  }, msg));
}
function AdminConfig({
  db,
  setDb,
  auth
}) {
  return React.createElement(React.Fragment, null, React.createElement(SectionTitle, null, "Ajustes del sistema"), React.createElement(BackupPanel, {
    db: db,
    setDb: setDb,
    auth: auth
  }), React.createElement(NotifyEmailForm, {
    db: db,
    setDb: setDb,
    auth: auth
  }), React.createElement(CambioPassAdmin, {
    db: db,
    setDb: setDb,
    auth: auth
  }), React.createElement(CambioPassSimple, {
    titulo: "Contraseña de guardias",
    icon: I.user,
    desc: "Una sola contraseña para todas las cuentas de guardia (guardia0001…).",
    onSave: hash => setDb(prev => {
      const nx = {
        ...prev,
        guardPassHash: hash
      };
      pushNotif(nx, auth, 'cambió la contraseña de los guardias');
      saveDB(nx);
      return nx;
    })
  }), React.createElement(CambioPassSimple, {
    titulo: "Contraseña de supervisores",
    icon: I.shield,
    desc: "Una sola contraseña para todas las cuentas de supervisor (supervisor01…).",
    onSave: hash => setDb(prev => {
      const nx = {
        ...prev,
        supPassHash: hash
      };
      pushNotif(nx, auth, 'cambió la contraseña de los supervisores');
      saveDB(nx);
      return nx;
    })
  }), React.createElement(CambioPassSimple, {
    titulo: "Contraseña de administrativos",
    icon: I.id,
    desc: "Una sola contraseña para todas las cuentas de administrativo (administrativo01…).",
    onSave: hash => setDb(prev => {
      const nx = {
        ...prev,
        adminPersPassHash: hash
      };
      pushNotif(nx, auth, 'cambió la contraseña de los administrativos');
      saveDB(nx);
      return nx;
    })
  }), React.createElement(CambioPassSimple, {
    titulo: "Contraseña de Recursos Humanos",
    icon: I.book,
    desc: `Cuenta de acceso: ${db.rrhh ? db.rrhh.usuario : 'rrhh'}`,
    onSave: hash => setDb(prev => {
      const nx = {
        ...prev,
        rrhh: {
          ...prev.rrhh,
          passHash: hash
        }
      };
      pushNotif(nx, auth, 'cambió la contraseña de RR.HH.');
      saveDB(nx);
      return nx;
    })
  }), React.createElement(CambioPassSimple, {
    titulo: "Contraseña de Operaciones",
    icon: I.grid,
    desc: `Cuenta de acceso: ${db.operaciones ? db.operaciones.usuario : 'operaciones'}`,
    onSave: hash => setDb(prev => {
      const nx = {
        ...prev,
        operaciones: {
          ...prev.operaciones,
          passHash: hash
        }
      };
      pushNotif(nx, auth, 'cambió la contraseña de Operaciones');
      saveDB(nx);
      return nx;
    })
  }));
}
function NotifyEmailForm({
  db,
  setDb,
  auth
}) {
  const [mail, setMail] = useState(db.notifyEmail || "");
  const [msg, setMsg] = useState(null);
  const guardar = () => {
    setDb(prev => {
      const nx = {
        ...prev,
        notifyEmail: mail.trim()
      };
      pushNotif(nx, auth, 'actualizó el correo de notificación');
      saveDB(nx);
      return nx;
    });
    setMsg("Correo de notificación actualizado.");
    setTimeout(() => setMsg(null), 2500);
  };
  return React.createElement(Card, null, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 4
    }
  }, React.createElement(Icon, {
    d: I.bell,
    size: 20,
    color: "var(--primary)"
  }), React.createElement("div", {
    style: {
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, "Correo de notificación")), React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--muted)',
      marginBottom: 14
    }
  }, "Correo enlazado al que se envían las notificaciones (infracciones, resúmenes). Solo el administrador lo define."), React.createElement(Field, {
    label: "Correo (Gmail)"
  }, React.createElement("input", {
    style: inputStyle,
    value: mail,
    onChange: e => setMail(e.target.value),
    placeholder: "notificaciones@empresa.com",
    autoCapitalize: "none"
  })), msg && React.createElement("div", {
    style: {
      background: 'var(--green-bg)',
      color: 'var(--green-t)',
      fontSize: 13,
      fontWeight: 600,
      padding: '9px 12px',
      borderRadius: 9,
      marginBottom: 12
    }
  }, msg), React.createElement("button", {
    onClick: guardar,
    style: {
      width: '100%',
      padding: '12px',
      background: 'var(--primary)',
      color: '#fff',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 15
    }
  }, "Guardar correo"));
}
function CambioPassAdmin({
  db,
  setDb,
  auth
}) {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [conf, setConf] = useState("");
  const [msg, setMsg] = useState(null);
  const cambiar = () => {
    setMsg(null);
    const adm = db.admins[auth.usuario];
    if (!adm || sha256(actual) !== adm.passHash) {
      setMsg({
        t: 'err',
        m: "La contraseña actual es incorrecta."
      });
      return;
    }
    if (nueva.length < 4) {
      setMsg({
        t: 'err',
        m: "Debe tener al menos 4 caracteres."
      });
      return;
    }
    if (nueva !== conf) {
      setMsg({
        t: 'err',
        m: "Las contraseñas no coinciden."
      });
      return;
    }
    setDb(prev => {
      const nx = {
        ...prev,
        admins: {
          ...prev.admins,
          [auth.usuario]: {
            ...prev.admins[auth.usuario],
            passHash: sha256(nueva)
          }
        }
      };
      saveDB(nx);
      return nx;
    });
    setActual("");
    setNueva("");
    setConf("");
    setMsg({
      t: 'ok',
      m: "Contraseña de administrador actualizada."
    });
  };
  return React.createElement(Card, null, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 4
    }
  }, React.createElement(Icon, {
    d: I.lock,
    size: 20,
    color: "var(--primary)"
  }), React.createElement("div", {
    style: {
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, "Contraseña de administrador")), React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--muted)',
      marginBottom: 14
    }
  }, "Usuario: ", React.createElement("b", null, auth.usuario)), React.createElement(Field, {
    label: "Contraseña actual"
  }, React.createElement(PassInput, {
    value: actual,
    onChange: e => setActual(e.target.value)
  })), React.createElement(Field, {
    label: "Nueva contraseña"
  }, React.createElement(PassInput, {
    value: nueva,
    onChange: e => setNueva(e.target.value)
  })), React.createElement(Field, {
    label: "Confirmar nueva contraseña"
  }, React.createElement(PassInput, {
    value: conf,
    onChange: e => setConf(e.target.value)
  })), msg && React.createElement("div", {
    style: {
      background: msg.t === 'ok' ? 'var(--green-bg)' : 'var(--red-bg)',
      color: msg.t === 'ok' ? 'var(--green-t)' : 'var(--red-t)',
      fontSize: 13,
      fontWeight: 600,
      padding: '9px 12px',
      borderRadius: 9,
      marginBottom: 12
    }
  }, msg.m), React.createElement("button", {
    onClick: cambiar,
    style: {
      width: '100%',
      padding: '12px',
      background: 'var(--primary)',
      color: '#fff',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 15
    }
  }, "Actualizar"));
}
function CambioPassSimple({
  titulo,
  desc,
  icon,
  onSave
}) {
  const [nueva, setNueva] = useState("");
  const [conf, setConf] = useState("");
  const [msg, setMsg] = useState(null);
  const cambiar = () => {
    setMsg(null);
    if (nueva.length < 4) {
      setMsg({
        t: 'err',
        m: "Debe tener al menos 4 caracteres."
      });
      return;
    }
    if (nueva !== conf) {
      setMsg({
        t: 'err',
        m: "Las contraseñas no coinciden."
      });
      return;
    }
    onSave(sha256(nueva));
    setNueva("");
    setConf("");
    setMsg({
      t: 'ok',
      m: "Contraseña actualizada."
    });
  };
  return React.createElement(Card, null, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 4
    }
  }, React.createElement(Icon, {
    d: icon,
    size: 20,
    color: "var(--primary)"
  }), React.createElement("div", {
    style: {
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, titulo)), React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--muted)',
      marginBottom: 14
    }
  }, desc), React.createElement(Field, {
    label: "Nueva contraseña"
  }, React.createElement(PassInput, {
    value: nueva,
    onChange: e => setNueva(e.target.value)
  })), React.createElement(Field, {
    label: "Confirmar nueva contraseña"
  }, React.createElement(PassInput, {
    value: conf,
    onChange: e => setConf(e.target.value)
  })), msg && React.createElement("div", {
    style: {
      background: msg.t === 'ok' ? 'var(--green-bg)' : 'var(--red-bg)',
      color: msg.t === 'ok' ? 'var(--green-t)' : 'var(--red-t)',
      fontSize: 13,
      fontWeight: 600,
      padding: '9px 12px',
      borderRadius: 9,
      marginBottom: 12
    }
  }, msg.m), React.createElement("button", {
    onClick: cambiar,
    style: {
      width: '100%',
      padding: '12px',
      background: 'var(--primary)',
      color: '#fff',
      border: 'none',
      borderRadius: 11,
      fontWeight: 700,
      fontSize: 15
    }
  }, "Actualizar"));
}
function AdminApp({
  db,
  setDb,
  auth,
  onLogout
}) {
  const [tab, setTab] = useState("dashboard");
  const tabs = [{
    id: "dashboard",
    label: "Resumen",
    icon: I.grid
  }, {
    id: "personal",
    label: "Personal",
    icon: I.user
  }, {
    id: "planillas",
    label: "Planillas",
    icon: I.route
  }, {
    id: "directorio",
    label: "Directorio",
    icon: I.book
  }, {
    id: "unidades",
    label: "Unidades",
    icon: I.map
  }, {
    id: "infracciones",
    label: "Infracciones y comunicados",
    icon: I.alert
  }, {
    id: "config",
    label: "Ajustes",
    icon: I.lock
  }];
  return React.createElement(Shell, {
    title: "Administración",
    subtitle: auth.nombre,
    onLogout: onLogout,
    tabs: tabs,
    active: tab,
    setActive: setTab
  }, tab === "dashboard" && React.createElement(Dashboard, {
    db: db,
    auth: auth,
    showActividad: true
  }), tab === "personal" && React.createElement(PersonalPanel, {
    db: db,
    setDb: setDb,
    auth: auth,
    showAdministrativos: true,
    showExtras: true
  }), tab === "directorio" && React.createElement(AdminDirectorio, {
    db: db
  }), tab === "unidades" && React.createElement(AdminUnidades, {
    db: db,
    setDb: setDb,
    auth: auth
  }), tab === "planillas" && React.createElement(PlanillasPanel, {
    db: db,
    viewer: "admin"
  }), tab === "infracciones" && React.createElement(AdminInfracciones, {
    db: db,
    setDb: setDb,
    auth: auth
  }), tab === "config" && React.createElement(AdminConfig, {
    db: db,
    setDb: setDb,
    auth: auth
  }));
}
function GestionApp({
  db,
  setDb,
  auth,
  onLogout,
  titulo
}) {
  const [tab, setTab] = useState("micontrol");
  const persona = personaDe(db, auth.role, 0);
  const esRRHH = auth.role === 'rrhh';
  const tabs = [{
    id: "micontrol",
    label: "Mi control",
    icon: I.clock
  }, {
    id: "personal",
    label: "Personal",
    icon: I.user
  }, {
    id: "planillas",
    label: "Planillas",
    icon: I.route
  }, {
    id: "infracciones",
    label: "Infracciones y comunicados",
    icon: I.alert
  }, {
    id: "directorio",
    label: "Directorio",
    icon: I.book
  }, {
    id: "unidades",
    label: "Unidades",
    icon: I.map
  }];
  return React.createElement(Shell, {
    title: titulo,
    subtitle: auth.nombre,
    onLogout: onLogout,
    tabs: tabs,
    active: tab,
    setActive: setTab
  }, tab === "micontrol" && React.createElement(MiControl, {
    db: db,
    setDb: setDb,
    auth: auth,
    persona: persona,
    soloAsistencia: true
  }), tab === "personal" && React.createElement(PersonalPanel, {
    db: db,
    setDb: setDb,
    auth: auth,
    showAdministrativos: esRRHH,
    showExtras: true
  }), tab === "directorio" && React.createElement(AdminDirectorio, {
    db: db
  }), tab === "unidades" && React.createElement(AdminUnidades, {
    db: db,
    setDb: setDb,
    auth: auth
  }), tab === "planillas" && React.createElement(PlanillasPanel, {
    db: db,
    viewer: auth.role
  }), tab === "infracciones" && React.createElement(AdminInfracciones, {
    db: db,
    setDb: setDb,
    auth: auth
  }));
}
function AdministrativoApp({
  db,
  setDb,
  auth,
  onLogout
}) {
  const [tab, setTab] = useState("micontrol");
  const a = (db.administrativos || []).find(x => x.id === auth.persId);
  if (!a) return React.createElement(Login, {
    db: db,
    onLogin: () => {}
  });
  const tabs = [{
    id: "micontrol",
    label: "Mi control",
    icon: I.clock
  }, {
    id: "infracciones",
    label: "Infracciones y comunicados",
    icon: I.alert
  }];
  return React.createElement(Shell, {
    title: a.nombre,
    subtitle: `Administrativo · ${a.cuenta}`,
    onLogout: onLogout,
    tabs: tabs,
    active: tab,
    setActive: setTab
  }, tab === "micontrol" && React.createElement(MiControl, {
    db: db,
    setDb: setDb,
    auth: auth,
    persona: a,
    soloAsistencia: true
  }), tab === "infracciones" && React.createElement(MisInfracciones, {
    db: db,
    persona: a,
    role: "administrativo"
  }));
}
function SupervisorApp({
  db,
  setDb,
  auth,
  onLogout
}) {
  const [tab, setTab] = useState("micontrol");
  const s = (db.supervisores || []).find(x => x.id === auth.persId);
  if (!s) return React.createElement(Login, {
    db: db,
    onLogin: () => {}
  });
  const tabs = [{
    id: "micontrol",
    label: "Mi control",
    icon: I.clock
  }, {
    id: "planillas",
    label: "Planillas",
    icon: I.route
  }, {
    id: "infracciones",
    label: "Infracciones y comunicados",
    icon: I.alert
  }, {
    id: "unidades",
    label: "Unidades",
    icon: I.map
  }, {
    id: "extras",
    label: "Extras",
    icon: I.swap
  }];
  return React.createElement(Shell, {
    title: s.nombre,
    subtitle: `Supervisor · ${s.cuenta}`,
    onLogout: onLogout,
    tabs: tabs,
    active: tab,
    setActive: setTab
  }, tab === "micontrol" && React.createElement(MiControl, {
    db: db,
    setDb: setDb,
    auth: auth,
    persona: s
  }), tab === "planillas" && React.createElement(PlanillasPanel, {
    db: db,
    viewer: "supervisor"
  }), tab === "infracciones" && React.createElement(AdminInfracciones, {
    db: db,
    setDb: setDb,
    auth: auth
  }), tab === "unidades" && React.createElement(AdminUnidades, {
    db: db,
    readOnly: true
  }), tab === "extras" && React.createElement(AdminExtras, {
    db: db,
    setDb: setDb,
    auth: auth,
    soloSupervisor: true
  }));
}
function App() {
  const [db, setDb] = useState(loadDB);
  const [sync, setSync] = useState(fireCore ? "conectando" : "local");
  useEffect(() => {
    if (!fireCore) return;
    let unsubs = [];
    let migrado = false;
    const empezarEscucha = () => {
      if (unsubs.length) return;
      unsubs.push(fireCore.onSnapshot(snap => {
        if (snap.exists) {
          const remoto = snap.data();
          if (!migrado && LEGACY_KEYS.some(k => Array.isArray(remoto[k]) && remoto[k].length)) {
            migrado = true;
            LEGACY_KEYS.forEach(k => {
              const col = fireCols[k];
              (remoto[k] || []).forEach(item => {
                if (item && item.id != null) col.doc(String(item.id)).set(item).catch(() => {});
              });
            });
            fireCore.set(nucleoDeEstado(remoto)).catch(() => {});
          }
          setDb(prev => {
            const fusion = {
              ...seed(),
              ...prev,
              ...nucleoDeEstado(remoto)
            };
            try {
              localStorage.setItem(DB_KEY, JSON.stringify(fusion));
            } catch (e) {}
            return fusion;
          });
          if (_ultimoSync) _ultimoSync = {
            ..._ultimoSync,
            ...nucleoDeEstado(remoto)
          };
          setSync("sincronizado");
        } else {
          fireCore.set(nucleoDeEstado(db)).catch(() => {});
          LEGACY_KEYS.forEach(k => {
            const col = fireCols[k];
            (db[k] || []).forEach(item => {
              if (item && item.id != null) col.doc(String(item.id)).set(item).catch(() => {});
            });
          });
        }
      }, () => setSync("sin conexión")));
      LEGACY_KEYS.forEach(k => {
        unsubs.push(fireCols[k].onSnapshot(snap => {
          const arr = snap.docs.map(x => x.data());
          setDb(prev => {
            const fusion = {
              ...prev,
              [k]: arr
            };
            try {
              localStorage.setItem(DB_KEY, JSON.stringify(fusion));
            } catch (e) {}
            return fusion;
          });
          if (_ultimoSync) _ultimoSync = {
            ..._ultimoSync,
            [k]: arr
          };
        }, () => setSync("sin conexión")));
      });
    };
    const unsubAuth = firebase.auth().onAuthStateChanged(user => {
      if (user) empezarEscucha();
    });
    return () => {
      unsubAuth();
      unsubs.forEach(u => u());
    };
  }, []);
  const [auth, setAuth] = useState(() => {
    try {
      const s = sessionStorage.getItem(SESSION_KEY);
      if (!s) return null;
      const a = JSON.parse(s);
      if (!a._ts || Date.now() - a._ts >= SESSION_HORAS * 3600 * 1000) return null;
      return a;
    } catch {
      return null;
    }
  });
  const iniciarSesion = a => setAuth({
    ...a,
    _ts: Date.now()
  });
  const logout = () => setAuth(null);
  useEffect(() => {
    if (!auth) {
      try {
        sessionStorage.removeItem(SESSION_KEY);
      } catch {}
      ;
      return;
    }
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(auth));
    } catch {}
    const restante = auth._ts + SESSION_HORAS * 3600 * 1000 - Date.now();
    if (restante <= 0) {
      setAuth(null);
      return;
    }
    const t = setTimeout(() => {
      alert("Su sesión de " + SESSION_HORAS + " horas ha expirado. Inicie sesión nuevamente.");
      setAuth(null);
    }, restante);
    return () => clearTimeout(t);
  }, [auth]);
  let contenido;
  if (!auth) contenido = React.createElement(Login, {
    db: db,
    onLogin: iniciarSesion
  });else if (auth.role === 'guardia') {
    const g = db.guardias.find(x => x.id === auth.persId);
    contenido = !g ? React.createElement(Login, {
      db: db,
      onLogin: iniciarSesion
    }) : React.createElement(GuardiaApp, {
      db: db,
      setDb: setDb,
      auth: auth,
      onLogout: logout
    });
  } else if (auth.role === 'supervisor') {
    const s = (db.supervisores || []).find(x => x.id === auth.persId);
    contenido = !s ? React.createElement(Login, {
      db: db,
      onLogin: iniciarSesion
    }) : React.createElement(SupervisorApp, {
      db: db,
      setDb: setDb,
      auth: auth,
      onLogout: logout
    });
  } else if (auth.role === 'administrativo') {
    const a = (db.administrativos || []).find(x => x.id === auth.persId);
    contenido = !a ? React.createElement(Login, {
      db: db,
      onLogin: iniciarSesion
    }) : React.createElement(AdministrativoApp, {
      db: db,
      setDb: setDb,
      auth: auth,
      onLogout: logout
    });
  } else if (auth.role === 'rrhh') contenido = React.createElement(GestionApp, {
    db: db,
    setDb: setDb,
    auth: auth,
    onLogout: logout,
    titulo: "Recursos Humanos"
  });else if (auth.role === 'operaciones') contenido = React.createElement(GestionApp, {
    db: db,
    setDb: setDb,
    auth: auth,
    onLogout: logout,
    titulo: "Operaciones"
  });else contenido = React.createElement(AdminApp, {
    db: db,
    setDb: setDb,
    auth: auth,
    onLogout: logout
  });
  return React.createElement(React.Fragment, null, fireCore && React.createElement("div", {
    style: {
      position: 'fixed',
      top: 6,
      right: 8,
      zIndex: 9999,
      fontSize: 10.5,
      fontWeight: 700,
      padding: '3px 8px',
      borderRadius: 20,
      background: sync === 'sincronizado' ? 'var(--green-bg)' : sync === 'sin conexión' ? 'var(--red-bg)' : 'var(--amber-bg)',
      color: sync === 'sincronizado' ? 'var(--green-t)' : sync === 'sin conexión' ? 'var(--red-t)' : 'var(--amber-t)'
    }
  }, sync === 'sincronizado' ? '● En línea' : sync === 'sin conexión' ? '● Sin conexión' : '● Conectando…'), contenido);
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
