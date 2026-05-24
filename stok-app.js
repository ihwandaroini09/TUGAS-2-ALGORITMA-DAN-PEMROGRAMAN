new Vue({
    el: '#app',

    data: {

        // DATA
        upbjjList: app.upbjjList,
        kategoriList: app.kategoriList,
        stok: app.stok,

        // FILTER
        filterUpbjj: '',
        filterKategori: '',
        sortBy: '',
        warningOnly: false,

        // FORM
        form: {
            kode: '',
            judul: '',
            kategori: '',
            upbjj: '',
            lokasiRak: '',
            harga: 0,
            qty: 0,
            safety: 0,
            catatanHTML: ''
        }

    },

    computed: {

        filteredStok(){

            let hasil = [...this.stok];

            // FILTER UPBJJ
            if(this.filterUpbjj){

                hasil = hasil.filter(item =>
                    item.upbjj == this.filterUpbjj
                );

            }

            // FILTER KATEGORI
            if(this.filterKategori){

                hasil = hasil.filter(item =>
                    item.kategori == this.filterKategori
                );

            }

            // FILTER WARNING
            if(this.warningOnly){

                hasil = hasil.filter(item =>
                    item.qty < item.safety
                );

            }

            // SORT
            if(this.sortBy){

                hasil.sort((a,b)=>{

                    if(this.sortBy == 'judul'){
                        return a.judul.localeCompare(b.judul);
                    }

                    if(this.sortBy == 'qty'){
                        return a.qty - b.qty;
                    }

                    if(this.sortBy == 'harga'){
                        return a.harga - b.harga;
                    }

                });

            }

            return hasil;

        }

    },

    watch: {

        filterUpbjj(value){

            console.log(
                'UPBJJ berubah:',
                value
            );

            this.filterKategori = '';

        },

        warningOnly(value){

            console.log(
                'Warning berubah:',
                value
            );

        }

    },

    methods: {

        // RESET FILTER
        resetFilter(){

            this.filterUpbjj = '';
            this.filterKategori = '';
            this.sortBy = '';
            this.warningOnly = false;

        },

        // TAMBAH DATA
        tambahData(){

            // VALIDASI
            if(
                !this.form.kode ||
                !this.form.judul ||
                !this.form.kategori ||
                !this.form.upbjj
            ){

                alert('Data belum lengkap!');
                return;

            }

            // TAMBAH DATA
            this.stok.push({

                kode: this.form.kode,
                judul: this.form.judul,
                kategori: this.form.kategori,
                upbjj: this.form.upbjj,
                lokasiRak: this.form.lokasiRak,
                harga: this.form.harga,
                qty: this.form.qty,
                safety: this.form.safety,
                catatanHTML: this.form.catatanHTML

            });

            alert('Data berhasil ditambahkan');

            // RESET FORM
            this.form = {

                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                harga: 0,
                qty: 0,
                safety: 0,
                catatanHTML: ''

            };

        }

    }

});