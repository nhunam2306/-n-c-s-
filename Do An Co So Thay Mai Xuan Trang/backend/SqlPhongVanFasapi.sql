-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th12 30, 2022 lúc 05:52 AM
-- Phiên bản máy phục vụ: 10.3.37-MariaDB-log-cll-lve
-- Phiên bản PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qblkwwdfhosting_phongvanne`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `products_cart` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `cod_product` varchar(200) NOT NULL,
  `name_product` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`cod_product`, `name_product`, `description`, `price`, `image`) VALUES
('4cd0866f-131e-4c3d-b4a2-6897ed9d4c03', 'SMILEY FACE HOODIE', 'SMILEY FACE HOODIE', '494100', 'https://bizweb.dktcdn.net/100/414/728/products/3-3-8febd418-89ce-4cfb-97af-8f6150e05259.jpg?v=1670559516383'),
('f950201f-01fa-49a3-97d3-c45918b39241', 'CLOWNZ BIG LOGO HOODIE', 'CLOWNZ BIG LOGO HOODIE', '550050', 'https://bizweb.dktcdn.net/100/414/728/products/3-6.jpg?v=1668850062540');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_section`
--

CREATE TABLE `product_section` (
  `id_section` int(11) NOT NULL,
  `section_name` varchar(255) NOT NULL,
  `products_id` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `product_section`
--

INSERT INTO `product_section` (`id_section`, `section_name`, `products_id`) VALUES
(3, 'ddd', '[\'4cd0866f-131e-4c3d-b4a2-6897ed9d4c03\']');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `USUARIO`
--

CREATE TABLE `USUARIO` (
  `user_id` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `avatar` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `USUARIO`
--

INSERT INTO `USUARIO` (`user_id`, `username`, `password`, `email`, `admin`, `avatar`) VALUES
('c1539e42-dd1a-4dfe-8e7c-12f382c31c96', 'phongvan', '$2b$12$myX/pMfvstcF7V3j7wxhf.rewP/zbEAuROYUyEEG/rGfX6GguJd/G', 'phongvan@gmail.com', 0, 'https://portal1.iff.edu.br/desenvolvimento-institucional/imagens/avatar.jpg'),
('eacee28b-3e89-4b13-bc72-7ce9f125b751', 'phongvan123', '$2b$12$idnWx2cNJX5yd/XYKARQLusqxYi5aYxfIwIQb6ooFwAcDJo2n65sq', 'phongvan123@gmail.com', 1, 'https://i.upanh.org/2022/12/27/phong.jpg'),
('52e5c66f-5a53-42f7-80a1-3f76684799e3', 'phongvan123', '$2b$12$idnWx2cNJX5yd/XYKARQLusqxYi5aYxfIwIQb6ooFwAcDJo2n65sq', 'phongvan123@gmail.com', 1, 'https://i.upanh.org/2022/12/27/phong.jpg'),
('ec6c19bf-7cbf-42b8-8b4a-0ab627732168', 'phongvantiktok', '$2b$12$s9vCFH7zjpHmKnQYo8Oz1OvCjWph5Hrzak/XUNenzbRE7huoYVO5i', 'phongvantiktok@gmail.com', 0, 'https://portal1.iff.edu.br/desenvolvimento-institucional/imagens/avatar.jpg'),
('d44064d5-9266-4d6b-a385-11cd744892e8', 'sduyifhwfh8237f', '$2b$12$lgN/WnbASM0B/r4e7K7DW.viqk98AgfHYSMXUcFlnbjv0t8jre22W', 'sduyifhwfh8237f@gmail.com', 0, 'https://portal1.iff.edu.br/desenvolvimento-institucional/imagens/avatar.jpg'),
('6857f690-8745-44bf-be9f-fcd6a3d198ef', 'phongvan2002', '$2b$12$ah7uRFz1XIeLyKvRPWEDAOv23Ob2RnMeTqjCxwmskmpPsYTjeDxxW', 'phongvan2002@gmail.com', 0, 'https://portal1.iff.edu.br/desenvolvimento-institucional/imagens/avatar.jpg');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `product_section`
--
ALTER TABLE `product_section`
  ADD PRIMARY KEY (`id_section`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `product_section`
--
ALTER TABLE `product_section`
  MODIFY `id_section` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
