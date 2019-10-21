-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 21, 2019 at 06:22 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `slideshow`
--

-- --------------------------------------------------------

--
-- Table structure for table `slideshow`
--

CREATE TABLE `slideshow` (
  `name` varchar(2000) NOT NULL,
  `type` varchar(2000) NOT NULL,
  `src` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `slideshow`
--

INSERT INTO `slideshow` (`name`, `type`, `src`) VALUES
('Slide 01', 'img', 'https://via.placeholder.com/300x200/000000/ffffff?text=Slide%2001'),
('Slide 02', 'img', 'https://via.placeholder.com/300x200/000000/ffffff?text=Slide%2002'),
('Slide 03', 'img', 'https://via.placeholder.com/300x200/000000/ffffff?text=Slide%2003'),
('Slide 04', 'img', 'https://via.placeholder.com/300x200/000000/ffffff?text=Slide%2004'),
('Slide 05', 'img', 'https://via.placeholder.com/300x200/000000/ffffff?text=Slide%2005'),
('Slide 06', 'img', 'https://via.placeholder.com/300x200/000000/ffffff?text=Slide%2006'),
('Slide 07', 'img', 'https://via.placeholder.com/300x200/000000/ffffff?text=Slide%2007'),
('Slide 08', 'img', 'https://via.placeholder.com/300x200/000000/ffffff?text=Slide%2008'),
('Slide 09', 'img', 'https://via.placeholder.com/300x200/000000/ffffff?text=Slide%2009'),
('Slide 10', 'img', 'https://via.placeholder.com/300x200/000000/ffffff?text=Slide%2010'),
('Slide 11', 'img', 'https://via.placeholder.com/300x200/000000/ffffff?text=Slide%2011'),
('Slide 12', 'img', 'https://via.placeholder.com/300x200/000000/ffffff?text=Slide%2012'),
('svg', 'svg', '/responsive-slideshow/images/omg.svg'),
('Slide 13', 'img', '/responsive-slideshow/images/omg.svg');
