'use strict';

var response = require('./res');
var connection = require('./conn');

exports.index = function (req, res) {
	response.ok("Backend OK", res)
};

// ================================================================

/*
    *INSERT BALITA
*/
exports.insertBalita = function (req, res) {
	var nama_balita = req.body.nama_balita;
	var tgl_lahir = req.body.tgl_lahir;
	var umurTahun = req.body.umur;
	var umurBulan = req.body.umur;
	var umurHari = req.body.umur;
	var alamat = req.body.alamat;
	var nik_ayah = req.body.nik_ayah;
	var nama_ayah = req.body.nama_ayah;
	var nama_ibu = req.body.nama_ibu;
	var nik_ibu = req.body.nik_ibu;
	var noHp_ayah = req.body.noHp_ayah;
	var noHp_ibu = req.body.noHp_ibu;

	connection.query('INSERT INTO balita (nama_balita, tgl_lahir, umurTahun, umurBulan, umurHari, alamat, nik_ayah, nama_ayah, nik_ibu, nama_ibu, noHp_ayah, noHp_ibu) values (?,?,?,?,?,?,?,?,?,?,?,?)',
		[nama_balita, tgl_lahir, umurTahun, umurBulan, umurHari, alamat, nik_ayah, nama_ayah, nik_ibu, nama_ibu, noHp_ayah, noHp_ibu],
		function (error, rows, fields) {
			if (error) {
				console.log(error)
			} else {
				response.ok("Berhasil menambahkan data balita.", res)
			}
		});
};

/*
    *INSERT IBU HAMIL
*/
exports.insertIbuHamil = function (req, res) {
	var nama_ayah = req.body.nama_ayah;
	var nik_ayah = req.body.nik_ayah;
	var nama_ibu = req.body.nama_ibu;
	var nik_ibu = req.body.nik_ibu;
	var alamat = req.body.alamat;
	var noHp = req.body.noHp;

	connection.query('INSERT INTO ibu_hamil (nama_ayah, nik_ayah, nama_ibu, nik_ibu, alamat, noHp) values (?,?,?,?,?,?)',
		[nama_ayah, nik_ayah, nama_ibu, nik_ibu, alamat, noHp],
		function (error, rows, fields) {
			if (error) {
				console.log(error)
			} else {
				response.ok("Berhasil menambahkan data ibu hamil.", res)
			}
		});
};

/*
    *COUNT DATA DAN BALITA
*/
exports.countDataBalita = function (req, res) {
	connection.query('SELECT count(*) as jumlahBalita FROM balita',
		function (error, rows, fields) {
			if (error) {
				console.log(error)
			} else {
				response.ok(rows[0], res)
			}
		});
};

/*
    *COUNT DATA IBU HAMIL
*/
exports.countDataIbuHamil = function (req, res) {
	connection.query('SELECT count(*) as jumlahIbuHamil FROM ibu_hamil',
		function (error, rows, fields) {
			if (error) {
				console.log(error)
			} else {
				response.ok(rows[0], res)
			}
		});
};

/*
    *VIEW DATA BALITA
*/
exports.viewDataBalita = function (req, res) {
	connection.query('SELECT * from balita',
		function (error, rows, fields) {
			if (error) {
				console.log(error)
			} else {
				response.ok(rows, res)
			}
		});
};

/*
    *VIEW DATA IBU HAMIL
*/
exports.viewDataIbuHamil = function (req, res) {
	connection.query('SELECT * from ibu_hamil',
		function (error, rows, fields) {
			if (error) {
				console.log(error)
			} else {
				response.ok(rows, res)
			}
		});
};

/*
    *REGISTER
*/
exports.register = function (req, res) {
	var users = {
		"email": req.body.email,
		"username": req.body.username,
		"password": req.body.password,
		"nama_lengkap": req.body.nama_lengkap,
		"alamat": req.body.alamat,
		"id_posyandu": req.body.id_posyandu
	}

	connection.query('INSERT INTO useradmin SET ?', users,
		function (error, rows, fields) {
			if (error) {
				console.log(error)
				response.fail('error ocurred', res)
			} else {
				response.ok('user registered sucessfully', res)
			}
		});
};


/*
    *LOGIN
*/
exports.login = function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var token = 't;OD%9GjOMpR~~sA+t-MHw%2sc]=a&wpd3>XeWNkr%h2.T!.o}!%#H}dF5.^Y&§x';

	connection.query('SELECT * FROM useradmin WHERE username = ?', [username],
		function (error, rows, fields) {
			if (error) {
				console.log(error)
				response.fail('error ocurred', res)
			} else {
				if (rows.length > 0) {
					if (rows[0].password == password) {
						response.ok(token, res)
					}
					else {
						response.fail('Email and password does not match', res)
					}
				}
				else {
					response.fail('Email does not exits', res)
				}
			}
		});
};

/*
    *VIEW JENIS KUNJUNGAN
*/
exports.viewJenisKunjungan = function (req, res) {
	connection.query('SELECT * from jenis_kunjungan',
		function (error, rows, fields) {
			if (error) {
				response.fail('error ocurred', res)
			} else {
				response.ok(rows, res)
			}
		});
};

/*
    *SEARCH KUNJUNGAN
*/
exports.searchKunjungan = function (req, res) {
	var id = req.body.id;

	connection.query('SELECT * FROM kunjungan WHERE id_kunjungan = ?', [id],
		function (error, rows, fields) {
			if (error) {
				console.log(error)
				response.fail('error ocurred', res)
			} else {
				if (rows.length > 0) {
					response.ok('Found', res)
				}
				else {
					response.fail('Not Found', res)
				}

			}
		});
};

/*
    *INSERT KUNJUNGAN
*/
exports.insertKunjungan = function (req, res) {
	var tglL = req.body.tgl_kunjungan;
	var id = req.body.id_balita;
	connection.query('SELECT * FROM kunjungan WHERE tgl_kunjungan = ? AND id_balita = ?', [tglL, id],
		function (error, rows, fields) {
			if (error) {
				console.log(error)
				response.fail(error, res)
			} else {
				if (rows.length > 0) {
					let ro = JSON.stringify(rows[0]);
					let roo = JSON.parse(ro);
					// var tgl_kunjungan = req.body.tgl_kunjungan;
					// var id_balita = req.body.id_balita;
					// var id_jenis_kunjungan = req.body.id_jenis_kunjungan;
					// var beratbadan = req.body.beratbadan;
					// var tinggi = req.body.tinggi;
					// var jenisImunisasi = req.body.jenisImunisasi;
					// // var jenisImunisasi = (req.body.jenisImunisasi == null) ? roo.jenisImunisasi : req.body.jenisImunisasi;

					var tgl_kunjungan = req.body.tgl_kunjungan;
					var id_balita = req.body.id_balita;
					var id_jenis_kunjungan = req.body.id_jenis_kunjungan;
					var beratbadan = req.body.beratbadan;
					var tinggi = req.body.tinggi;
					var jenisImunisasi = req.body.jenisImunisasi
					var keteranganPemberianVit = req.body.keteranganPemberianVitamin
					var sttsGizi = req.body.sttsGizi
					var cekGizi = req.body.cekGizi
					var pemberianObat = req.body.pemberianObat

					if (id_jenis_kunjungan == "BB") {
						connection.query('UPDATE kunjungan SET tgl_kunjungan = ?, id_jenis_kunjungan = ?, beratbadan = ?, tinggi = ?, sttsGizi = ? WHERE tgl_kunjungan = ? AND id_balita = ?',
							[tgl_kunjungan, id_jenis_kunjungan, beratbadan, tinggi, sttsGizi, tglL, id],
							function (err, ro, fi) {
								if (err) {
									response.fail(err, res)
								} else {
									response.ok("Berhasil menambahkan kunjungan.", res)
								}
							});
					} else if (id_jenis_kunjungan == "IM") {
						connection.query('UPDATE kunjungan SET tgl_kunjungan = ?, id_jenis_kunjungan = ?, jenisImunisasi = ? WHERE tgl_kunjungan = ? AND id_balita = ?',
							[tgl_kunjungan, id_jenis_kunjungan, jenisImunisasi, tglL, id],
							function (err, ro, fi) {
								if (err) {
									response.fail(err, res)
								} else {
									response.ok("Berhasil menambahkan kunjungan.", res)
								}
							});
					} else if (id_jenis_kunjungan == "PV") {
						connection.query('UPDATE kunjungan SET tgl_kunjungan = ?, id_jenis_kunjungan = ?, keteranganPemberianVit = ? WHERE tgl_kunjungan = ? AND id_balita = ?',
							[tgl_kunjungan, id_jenis_kunjungan, keteranganPemberianVit, tglL, id],
							function (err, ro, fi) {
								if (err) {
									response.fail(err, res)
								} else {
									response.ok("Berhasil menambahkan kunjungan.", res)
								}
							});
					} else if (id_jenis_kunjungan == "CG") {
						connection.query('UPDATE kunjungan SET tgl_kunjungan = ?, id_jenis_kunjungan = ?, cek_gizi = ? WHERE tgl_kunjungan = ? AND id_balita = ?',
							[tgl_kunjungan, id_jenis_kunjungan, cekGizi, tglL, id],
							function (err, ro, fi) {
								if (err) {
									response.fail(err, res)
								} else {
									response.ok("Berhasil menambahkan kunjungan.", res)
								}
							});
					} else if (id_jenis_kunjungan == "PO") {
						connection.query('UPDATE kunjungan SET tgl_kunjungan = ?, id_jenis_kunjungan = ?, pemb_obat = ? WHERE tgl_kunjungan = ? AND id_balita = ?',
							[tgl_kunjungan, id_jenis_kunjungan, pemberianObat, tglL, id],
							function (err, ro, fi) {
								if (err) {
									response.fail(err, res)
								} else {
									response.ok("Berhasil menambahkan kunjungan.", res)
								}
							});
					}
				}
				else {
					var tgl_kunjungan = req.body.tgl_kunjungan;
					var id_balita = req.body.id_balita;
					var id_jenis_kunjungan = req.body.id_jenis_kunjungan;
					var beratbadan = req.body.beratbadan;
					var tinggi = req.body.tinggi;
					var jenisImunisasi = req.body.jenisImunisasi;
					var keteranganPemberianVitamin = req.body.keteranganPemberianVitamin;
					var sttsGizi = req.body.sttsGizi;
					connection.query('INSERT INTO kunjungan (tgl_kunjungan, id_balita, id_jenis_kunjungan, beratbadan, tinggi, jenisImunisasi, keteranganPemberianVit, sttsGizi) values (?,?,?,?,?,?,?,?)',
						[tgl_kunjungan, id_balita, id_jenis_kunjungan, beratbadan, tinggi, jenisImunisasi, keteranganPemberianVitamin, sttsGizi],
						function (err, ro, fi) {
							if (err) {
								response.fail(err, res)
							} else {
								response.ok("Berhasil membuat kunjungan.", res)
							}
						});
				}

			}
		});
};

/*
    *VIEW KUNJUNGAN BALITA
*/
exports.viewKunjunganBalita = function (req, res) {
	var id = req.body.id_balita;

	if ((id == null) || (id == '')) {
		connection.query('SELECT * from kunjungan',
			function (err, ro, fi) {
				if (err) {
					response.fail('error ocurred', res)
				} else {
					response.ok(ro, res)
				}
			});
	} else {
		connection.query('SELECT * from kunjungan WHERE id_balita = ?',
			[id],
			function (err, ro, fi) {
				if (err) {
					response.fail('error ocurred', res)
				} else {
					response.ok(ro, res)
				}
			});
	}
};

/*
    *INSERT KUNJUNGAN IBU HAMIL
*/
exports.insertKunjunganIbuHamil = function (req, res) {
	var id_ibu = req.body.id_ibu;
	var tgl_kunjungan = req.body.tgl_kunjungan;
	var bb = req.body.bb;
	var rPenyakit = req.body.rPenyakit;
	var rAlergi = req.body.rAlergi;
	var rKB = req.body.rKB;
	var hamilke = req.body.hamilke;
	var usiaAnakTerakhir = req.body.usiaAnakTerakhir;
	var tmptLahirAnak = req.body.tmptLahirAnak;
	var BBAnak = req.body.BBAnak;
	var rImunisasi = req.body.rImunisasi;

	connection.query('INSERT INTO kunjunganIbuHamil (id_ibu_hamil, tgl_kunjungan, BB, riwayatPenyakit, riwayatAlergi, riwayatKB, hamilke, usiaAnakTerakhir, tempat_lahir, BBanakTerakhir, riwayatImunisasi) values (?,?,?,?,?,?,?,?,?,?,?)',
		[id_ibu, tgl_kunjungan, bb, rPenyakit, rAlergi, rKB, hamilke, usiaAnakTerakhir, tmptLahirAnak, BBAnak, rImunisasi],
		function (error, rows, fields) {
			if (error) {
				console.log(error)
			} else {
				response.ok("Berhasil menambahkan data ibu hamil.", res)
			}
		});
};

/*
    *VIEW KUNJUNGAN IBU HAMIL
*/
exports.viewKunjunganIbuHamil = function (req, res) {
	var id = req.body.id_ibu_hamil;

	if ((id == null) || (id == '')) {
		connection.query('SELECT * from kunjunganIbuHamil',
			function (err, ro, fi) {
				if (err) {
					response.fail('error ocurred', res)
				} else {
					response.ok(ro, res)
				}
			});
	} else {
		connection.query('SELECT * from kunjunganIbuHamil WHERE id_ibu_hamil = ?',
			[id],
			function (err, ro, fi) {
				if (err) {
					response.fail('error ocurred', res)
				} else {
					response.ok(ro, res)
				}
			});
	}
};