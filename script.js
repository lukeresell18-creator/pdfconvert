// riferimento agli elementi HTML
const imageInput = document.getElementById("imageInput");
const convertBtn = document.getElementById("convertBtn");

// quando clicchi il bottone
convertBtn.addEventListener("click", async () => {

  const files = imageInput.files;

  if (files.length === 0) {
    alert("Seleziona almeno un'immagine");
    return;
  }

  // creiamo un nuovo PDF
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const imgData = await readImage(file);

    // dimensioni pagina PDF
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      pageWidth,
      pageHeight
    );

    // se non è l'ultima immagine, nuova pagina
    if (i < files.length - 1) {
      pdf.addPage();
    }
  }

  // scarica il PDF
  pdf.save("immagini.pdf");
});

// funzione per leggere le immagini
function readImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
