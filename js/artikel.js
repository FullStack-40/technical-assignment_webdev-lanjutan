const articles = [
  {
    title: "Manfaat Kesehatan dari Olahraga",
    author: "Dr. Fitra",
    content:
      "Olahraga memiliki manfaat besar untuk kesehatan fisik dan mental. ...",
    date: "October 20, 2023",
  },
  {
    title: "Mengelola Stres: Tips dan Trik",
    author: "Dr. Anisa",
    content: "Stres adalah bagian dari kehidupan sehari-hari, namun ...",
    date: "October 21, 2023",
  },
  {
    title: "Manfaat Olahraga bagi Kesehatan",
    author: "Dr. Mille",
    content:
      "Olahraga memiliki manfaat besar bagi kesehatan fisik dan mental. Rutin berolahraga dapat meningkatkan daya tahan tubuh, menjaga berat badan yang sehat, meningkatkan sirkulasi darah, dan mengurangi risiko penyakit jantung. Selain itu, olahraga juga dapat membantu mengurangi stres dan meningkatkan mood, menjadikannya suatu kegiatan penting untuk kesehatan dan kesejahteraan.",
    date: "October 01, 2023",
  },
  {
    title: "Kebiasaan Makan Sehat untuk Hidup Lebih Baik",
    author: "Dr. Richard",
    content:
      "Memiliki kebiasaan makan sehat adalah kunci untuk hidup lebih baik dan sehat. Konsumsi makanan bergizi, seperti buah, sayur, biji-bijian, dan protein berkualitas, dapat memberikan nutrisi penting untuk tubuh. Hindari makanan tinggi lemak jenuh dan gula tambahan yang dapat meningkatkan risiko penyakit jantung, diabetes, dan obesitas.",
    date: "October 15, 2023",
  },
  {
    title: "Pentingnya Tidur yang Cukup untuk Kesehatan",
    author: "Dr. Putra",
    content:
      "Tidur yang cukup adalah komponen penting dalam menjaga kesehatan tubuh dan otak. Tidur yang baik membantu pemulihan tubuh, meningkatkan daya tahan, dan memperbaiki fungsi kognitif. Kekurangan tidur dapat mengakibatkan masalah kesehatan seperti kelelahan, kurang fokus, dan meningkatkan risiko penyakit kronis.",
    date: "October 12, 2023",
  },
  {
    title: "Menjaga Kesehatan Mental dengan Baik",
    author: "Dr. Putri",
    content:
      "Kesehatan mental sama pentingnya dengan kesehatan fisik. Berbagai cara dapat membantu menjaga kesehatan mental, seperti meditasi, olahraga, menjalani hobi, dan menjalin hubungan sosial yang positif. Penting untuk mengenali dan mengatasi stres serta mencari bantuan jika diperlukan untuk mengelola kesehatan mental dengan baik.",
    date: "October 03, 2023",
  },
];

function buildArticleCard(article) {
  return `
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-subtitle mb-2 text-muted">By ${article.author} - ${article.date}</p>
            <p class="card-text overflow-auto" style="height: 150px">${article.content}</p>
            <a href="#" class="btn btn-primary w-100">Lihat Selengkapnya</a>
          </div>
        </div>
      </div>
    `;
}

function displayArticles() {
  const articleContainer = document.getElementById("articleContainer");

  if (Array.isArray(articles)) {
    articles.forEach((article) => {
      const articleCard = buildArticleCard(article);
      articleContainer.innerHTML += articleCard;
    });
  } else {
    console.error("Data artikel gagal di ambil.");
  }
}

displayArticles();
