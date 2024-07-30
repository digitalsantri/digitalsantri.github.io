let searchResults = [];
let currentIndex = -1;

function searchText() {
    // Ambil teks yang dimasukkan user
    const searchText = document.getElementById('searchText').value.trim();
    
    // Cek apakah input kosong
    if (searchText === '') {
        alert('Input pencarian tidak boleh kosong.');
        return; // Keluar dari fungsi jika input kosong
    }

    // Dapatkan semua elemen yang memiliki class 'PageText'
    const pageTexts = document.querySelectorAll('.PageText');

    // Reset hasil pencarian dan indeks
    searchResults = [];
    currentIndex = -1;

    // Loop melalui setiap elemen dan cari teks
    pageTexts.forEach(pageText => {
        // Hapus highlight sebelumnya
        let innerHTML = pageText.innerHTML;
        innerHTML = innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');

        // Buat regex untuk mencari teks yang dimasukkan
        const searchRegex = new RegExp(searchText, 'gi'); // 'gi' untuk case-insensitive

        // Tambahkan highlight ke teks yang ditemukan
        innerHTML = innerHTML.replace(searchRegex, match => {
            return '<span class="highlight">' + match + '</span>';
        });

        // Setel kembali innerHTML
        pageText.innerHTML = innerHTML;

        // Tambahkan elemen ke hasil pencarian jika ditemukan
        if (innerHTML.includes('<span class="highlight">')) {
            searchResults.push(pageText);
        }
    });

    // Reset currentIndex jika ada hasil
    if (searchResults.length > 0) {
        currentIndex = 0;
        searchResults[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function scrollToNext() {
    if (searchResults.length > 0) {
        // Scroll ke hasil berikutnya
        currentIndex = (currentIndex + 1) % searchResults.length;
        searchResults[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function scrollToPrevious() {
    if (searchResults.length > 0) {
        // Scroll ke hasil sebelumnya
        currentIndex = (currentIndex - 1 + searchResults.length) % searchResults.length;
        searchResults[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}