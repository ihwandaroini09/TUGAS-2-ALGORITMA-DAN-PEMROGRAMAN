new Vue({
    el: '#trackingApp',

    data: {

        pengirimanList: app.pengirimanList,
        paket: app.paket,
        tracking: app.tracking,

        selectedPaket: '',

        form: {

            nomorDO: '',
            nim: '',
            nama: '',
            ekspedisi: '',
            tanggalKirim: '',
            total: 0

        }

    },

    created(){

            this.generateNomorDO();

            this.form.tanggalKirim =
                new Date()
                .toISOString()
                .split('T')[0];


    },

    watch: {

        selectedPaket(value){

            if(value){

                this.form.total =
                    value.harga;

            }

        }

    },

    methods: {

        // GENERATE NOMOR DO
        generateNomorDO(){

            let jumlah =
                Object.keys(this.tracking).length + 1;

            let nomor =
                String(jumlah).padStart(3,'0');

            let tahun =
                new Date().getFullYear();

            this.form.nomorDO =
                `DO${tahun}-${nomor}`;

        },

        // TAMBAH TRACKING
        tambahTracking(){

            if(
                !this.form.nim ||
                !this.form.nama ||
                !this.form.ekspedisi ||
                !this.selectedPaket
            ){

                alert('Data belum lengkap!');
                return;

            }

            this.tracking[
                this.form.nomorDO
            ] = {

                nim: this.form.nim,
                nama: this.form.nama,
                status: 'Diproses',
                ekspedisi: this.form.ekspedisi,
                tanggalKirim: this.form.tanggalKirim,
                paket: this.selectedPaket.nama,
                total: this.form.total,
                perjalanan: []

            };

            alert('Tracking berhasil ditambahkan');

            // RESET FORM
            this.form = {

                nomorDO: '',
                nim: '',
                nama: '',
                ekspedisi: '',
                tanggalKirim: '',
                total: 0

            };

            this.selectedPaket = '';

            // GENERATE NOMOR BARU
            this.generateNomorDO();

        }

    }

});