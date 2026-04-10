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

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

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
        dotsOptions: {
            color: color
        },
        image: logoData
    });
}

document.getElementById("logoInput").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        logoData = event.target.result;
        generateQR();
    };
    reader.readAsDataURL(file);
});

function downloadQR() {
    qrCode.download({
        name: "qr",
        extension: "png"
    });
}

async function copyQR() {
    const canvas = qrContainer.querySelector("canvas");
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
        try {
            await navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob })
            ]);
            alert("✅ QR copiado al portapapeles");
        } catch (err) {
            alert("❌ Error al copiar");
        }
    });
}

function resetAll() {
    document.getElementById("urlInput").value = "";
    document.getElementById("colorPicker").value = "#000000";
    document.getElementById("logoInput").value = "";
    document.getElementById("error").innerText = "";
    logoData = null;

    qrCode.update({
        data: "",
        image: "",
        dotsOptions: {
            color: "#000000"
        }
    });
}
