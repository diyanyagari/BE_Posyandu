-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 05 Des 2019 pada 09.24
-- Versi server: 10.4.8-MariaDB
-- Versi PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `posyandu`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `balita`
--

CREATE TABLE `balita` (
  `id_balita` int(100) NOT NULL,
  `nama_balita` varchar(100) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `umurTahun` int(100) NOT NULL,
  `umurBulan` int(100) NOT NULL,
  `umurHari` int(100) NOT NULL,
  `alamat` varchar(1500) NOT NULL,
  `nik_ayah` varchar(255) NOT NULL,
  `nama_ayah` varchar(100) NOT NULL,
  `nik_ibu` varchar(255) NOT NULL,
  `nama_ibu` varchar(100) NOT NULL,
  `noHp_ayah` varchar(255) NOT NULL,
  `noHp_ibu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `balita`
--

INSERT INTO `balita` (`id_balita`, `nama_balita`, `tgl_lahir`, `umurTahun`, `umurBulan`, `umurHari`, `alamat`, `nik_ayah`, `nama_ayah`, `nik_ibu`, `nama_ibu`, `noHp_ayah`, `noHp_ibu`) VALUES
(1, 'adi', '2019-11-01', 1, 0, 0, 'bandung', '1081823881', 'adi', '01838048510', 'ruri', '0812188986867', '0858574639987'),
(2, 'adhi', '2017-08-04', 2, 0, 0, 'bandung', '998389485', 'rudi', '894889589', 'rina', '08129848595', '08989884723'),
(3, 'bebi', '2019-11-13', 2, 0, 0, 'bandung', '123132132123', 'purnomo', '18312893123', '18102830123', 'ririn', '18180231'),
(4, 'adhi', '2017-08-04', 2, 2, 2, 'bandung', '998389485', 'rudi', '894889589', 'rina', '08129848595', '08989884723'),
(5, 'Rizky Ramadhan Saputra', '2019-08-01', 1, 1, 1, 'bandung selatan', '8009818237', 'Anton', '1000192837', '89123848597', 'Ririn', '81212987857');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ibu_hamil`
--

CREATE TABLE `ibu_hamil` (
  `id_ibu` int(100) NOT NULL,
  `nama_ayah` varchar(100) NOT NULL,
  `nik_ayah` varchar(100) NOT NULL,
  `nama_ibu` varchar(100) NOT NULL,
  `nik_ibu` varchar(100) NOT NULL,
  `alamat` varchar(1500) NOT NULL,
  `noHp` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `ibu_hamil`
--

INSERT INTO `ibu_hamil` (`id_ibu`, `nama_ayah`, `nik_ayah`, `nama_ibu`, `nik_ibu`, `alamat`, `noHp`) VALUES
(1, 'rudi', '98182398489', 'ratna', '65781726578', 'bandung', '087587239487'),
(2, 'purnomo', '8389384', 'ririn', '311231231213', 'bandung', '81928901923'),
(3, 'Bambang', '19209848495', 'Dinda', '10098498579', 'jl cikutra raya baru no 28 b bandung jawa barat', '81298298498');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jenis_kunjungan`
--

CREATE TABLE `jenis_kunjungan` (
  `id_jenis_kunjungan` int(100) NOT NULL,
  `jenis_kunjungan` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `jenis_kunjungan`
--

INSERT INTO `jenis_kunjungan` (`id_jenis_kunjungan`, `jenis_kunjungan`) VALUES
(1, 'Periksa BB dan Tinggi'),
(2, 'Imunisasi'),
(3, 'Pemberian Vitamin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kunjungan`
--

CREATE TABLE `kunjungan` (
  `id_kunjungan` int(100) NOT NULL,
  `tgl_kunjungan` date NOT NULL,
  `id_balita` int(100) NOT NULL,
  `id_jenis_kunjungan` varchar(255) NOT NULL,
  `beratbadan` varchar(255) NOT NULL,
  `tinggi` varchar(255) NOT NULL,
  `jenisImunisasi` varchar(255) NOT NULL,
  `keteranganPemberianVit` varchar(255) NOT NULL,
  `sttsGizi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kunjungan`
--

INSERT INTO `kunjungan` (`id_kunjungan`, `tgl_kunjungan`, `id_balita`, `id_jenis_kunjungan`, `beratbadan`, `tinggi`, `jenisImunisasi`, `keteranganPemberianVit`, `sttsGizi`) VALUES
(1, '2019-12-03', 1, 'BB', '11', '12', '', 'tesKeterangan', ''),
(2, '2019-12-03', 2, '1', '10', '10', '1', 'tesKeterangan', ''),
(3, '2019-12-03', 2, '1', '6', '6', '1', 'tesKeterangan', ''),
(4, '2019-12-05', 5, 'BB', '10', '10', '3', 'testing vitamin', 'Normal');

-- --------------------------------------------------------

--
-- Struktur dari tabel `useradmin`
--

CREATE TABLE `useradmin` (
  `id_admin` int(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `id_posyandu` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `useradmin`
--

INSERT INTO `useradmin` (`id_admin`, `email`, `username`, `password`, `nama_lengkap`, `alamat`, `id_posyandu`) VALUES
(1, 'tes@gmail.com', 'testing', '123123', 'testing1', 'bandung', 1),
(2, 'tes@gmail.com', 'testing', '123123', 'testing1', 'bandung', 1),
(3, 'tes@gmail.com', 'testing', '123123', 'testing1', 'bandung', 1),
(5, 'shaiel.pz44@gmail.com', 'tes2', '1234', 'tes1', 'qewqewqew', 3),
(6, 'shaiel.pz44@gmail.com', 'tes1', '1234', 'adsa', 'ada', 2),
(9, 'marco.medellinjr@gmail.com', 'admin1', '1234', 'admin ', 'bandung', 2);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `balita`
--
ALTER TABLE `balita`
  ADD PRIMARY KEY (`id_balita`);

--
-- Indeks untuk tabel `ibu_hamil`
--
ALTER TABLE `ibu_hamil`
  ADD PRIMARY KEY (`id_ibu`);

--
-- Indeks untuk tabel `jenis_kunjungan`
--
ALTER TABLE `jenis_kunjungan`
  ADD PRIMARY KEY (`id_jenis_kunjungan`);

--
-- Indeks untuk tabel `kunjungan`
--
ALTER TABLE `kunjungan`
  ADD PRIMARY KEY (`id_kunjungan`);

--
-- Indeks untuk tabel `useradmin`
--
ALTER TABLE `useradmin`
  ADD PRIMARY KEY (`id_admin`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `balita`
--
ALTER TABLE `balita`
  MODIFY `id_balita` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `ibu_hamil`
--
ALTER TABLE `ibu_hamil`
  MODIFY `id_ibu` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `jenis_kunjungan`
--
ALTER TABLE `jenis_kunjungan`
  MODIFY `id_jenis_kunjungan` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `kunjungan`
--
ALTER TABLE `kunjungan`
  MODIFY `id_kunjungan` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `useradmin`
--
ALTER TABLE `useradmin`
  MODIFY `id_admin` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
