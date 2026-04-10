let qrCode;
let logoData = null;

const qrContainer = document.getElementById("qrContainer");

qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data: "",
    image: "",
    dotsOptions: {
        color: "#000000",
        type: "rounded"
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
        imageSize: 0.3
    },
    qrOptions: {
        errorCorrectionLevel: "H"
    },
    backgroundOptions: {
        color: "#ffffff"
    }
});

qrCode.append(qrContainer);

/* VALIDAR URL */
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

/* GENERAR QR */
function generateQR() {
    const url = document.getElementById("urlInput").value;
    const color = document.getElementById("colorPicker").value;
    const error = document.getElementById("error");

    if (!isValidURL(url)) {
        error.innerText = "⚠️ URL inválida";
        return;
    }

    error.innerText = "";

    qrCode.update({
        data: url,
        dotsOptions: { color: color },
        image: logoData
    });
}

/* LOGO */
document.getElementById("logoBtn").addEventListener("click", () => {
    document.getElementById("logoInput").click();
});

document.getElementById("logoInput").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    document.getElementById("fileName").innerText = file.name;

    const reader = new FileReader();
    reader.onload = function(event) {
        logoData = event.target.result;
        generateQR();
    };
    reader.readAsDataURL(file);
});

/* DESCARGAR */
function downloadQR() {
    qrCode.download({
        name: "qr",
        extension: "png"
    });
}

/* COPIAR */
async function copyQR() {
    const canvas = qrContainer.querySelector("canvas");
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
        try {
            await navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob })
            ]);
            alert("✅ Copiado");
        } catch {
            alert("❌ Error al copiar");
        }
    });
}

/* RESET */
function resetAll() {
    document.getElementById("urlInput").value = "";
    document.getElementById("colorPicker").value = "#000000";
    document.getElementById("logoInput").value = "";
    document.getElementById("fileName").innerText = "Ningún archivo seleccionado";
    document.getElementById("error").innerText = "";
    logoData = null;

    qrCode.update({
        data: "",
        image: "",
        dotsOptions: { color: "#000000" }
    });
}

/* TEMA */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    const body = document.body;

    if (body.classList.contains("dark")) {
        body.classList.replace("dark", "light");
        themeToggle.innerText = "☀️";
    } else {
        body.classList.replace("light", "dark");
        themeToggle.innerText = "🌙";
    }
});