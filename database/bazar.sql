-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: 127.0.0.1
-- Čas generovania: Út 06.Jún 2023, 15:41
-- Verzia serveru: 10.4.27-MariaDB
-- Verzia PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáza: `bazar`
--

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Sťahujem dáta pre tabuľku `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Elektronika'),
(2, 'Dom a záhrada'),
(3, 'Móda a doplnky'),
(4, 'Šport a fitness'),
(5, 'Knihy a časopisy'),
(6, 'Hračky a hry'),
(7, 'Autá'),
(8, 'Zdravie a krása'),
(9, 'Umenie a zbierky'),
(10, 'Zvieratá');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `listings`
--

CREATE TABLE `listings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `price` int(11) NOT NULL,
  `locality` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `watch_count` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Sťahujem dáta pre tabuľku `listings`
--

INSERT INTO `listings` (`id`, `user_id`, `name`, `price`, `locality`, `description`, `watch_count`, `category_id`) VALUES
(1, 1, 'Červený bicykel', 50, 'Bratislava', 'Ľahko používaný červený bicykel s pohodlným sedadlom.', 5, 1),
(2, 1, 'Modrý batoh', 30, 'Košice', 'Odolný modrý batoh s viacerými priehradkami.', 2, 2),
(3, 2, 'Hnedé kožené topánky', 75, 'Banská Bystrica', 'Elegantný pár hnedých kožených topánok v skvelej kondícii.', 8, 3),
(4, 3, 'Čierny konferenčný stolík', 100, 'Žilina', 'Moderný čierny konferenčný stolík s plochou z skla.', 3, 4),
(5, 3, 'Zelený dekoratívny vankúš', 10, 'Nitra', 'Mäkký zelený dekoratívny vankúš v skvelej kondícii.', 1, 5),
(6, 4, 'Červený sveter', 20, 'Bratislava', 'Teplý a útulný červený sveter na chladnejšie mesiace.', 7, 6),
(7, 5, 'Strieborné hodinky', 50, 'Košice', 'Elegantné strieborné hodinky, ktoré presne ukazujú čas.', 3, 7),
(8, 6, 'Žltá váza', 15, 'Banská Bystrica', 'Krásna žltá váza na obľúbené kvety.', 0, 8),
(9, 7, 'Čierne džínsy', 25, 'Žilina', 'Pohodlné čierne džínsy, ktoré sa hodí ku všetkému.', 2, 9),
(10, 8, 'Hnedá kožená kabelka', 50, 'Nitra', 'Štýlová hnedá kožená kabelka s veľkým úložným priestorom.', 1, 10),
(11, 9, 'Sivá bunda', 40, 'Bratislava', 'Ľahká sivá bunda, ktorá je ideálna na jar.', 4, 11),
(12, 10, 'Oranžový klobúk', 15, 'Košice', 'Zábavný a farebný oranžový klobúk, ktorý je ideálny na slnečný deň.', 0, 12),
(13, 11, 'Fialová jógová podložka', 20, 'Banská Bystrica', 'Vysoko kvalitná fialová jógová podložka, ideálna pre akýkoľvek stupeň cvičenia.', 6, 13),
(14, 12, 'Strieborný náhrdelník', 30, 'Žilina', 'Krásny strieborný náhrdelník, ideálny na akúkoľvek príležitosť.', 2, 14),
(15, 13, 'Biele tenisky', 35, 'Nitra', 'Pohodlný pár bielych tenisiek, ktoré sa hodia ku každému oblečeniu.', 1, 15),
(16, 14, 'Modrá košeľa', 20, 'Bratislava', 'Klasická modrá košeľa, ideálna do práce alebo na voľný čas.', 3, 16),
(17, 14, 'Zelené kraťasy', 15, 'Košice', 'Pohodlný pár zelených kraťasov na teplejšie mesiace.', 2, 17),
(18, 15, 'Čierny batoh', 40, 'Banská Bystrica', 'Odolný čierny batoh s viacerými priehradkami.', 1, 18),
(19, 16, 'Sivý mikina', 25, 'Žilina', 'Teplá a pohodlná sivá mikina, ideálna na lenivé dni.', 5, 19),
(20, 17, 'Ružový šál', 10, 'Nitra', 'Mäkký a štýlový ružový šál, ktorý dodá farbu každému outfitu.', 0, 20);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `photo` longblob NOT NULL,
  `listing_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `saved`
--

CREATE TABLE `saved` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `listing_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone_number` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Sťahujem dáta pre tabuľku `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone_number`) VALUES
(1, 'johnsmith', '09343625c6c123d3434932fe1ce08bae5ac00a8f95bd746e10491b0bafdd1817', 'johnsmith@example.com', '1234567890') /*--password1*/,
(2, 'janeDoe', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'janedoe@example.com', '2345678901') /*--password123*/,
(3, 'michalPichal', '3baff57541a4f5dd1ebdddf30c6a4df665416727d56ece310b0f56ee86d80dd1', 'michaelj@example.com', '3456789012') /*--ilovemusic*/,
(4, 'sarahc', '1c8bfe8f801d79745c4631d09fff36c82aa37fc4cce4fc946683d7b336b63032', 'sarahc@example.com', '4567890123') /*--letmein*/,
(5, 'davidm', 'e69cdcb6168f4f894be8b21ff181b61b4c8f106c20ea9671c3e62b7e7e105da9', 'davidm@example.com', '5678901234') /*--secretword*/,
(6, 'laurabrown', '8767a7d316ad68cb607c7c805b859ffa78277dda13b7a3e2e8b53cad3cabbc6e', 'laurabrown@example.com', '6789012345') /*--mypassword2*/,
(7, 'robertw', 'daaad6e5604e8e17bd9f108d91e26afe6281dac8fda0091040a7a6d7bd9b43b5', 'robertw@example.com', '7890123456') /*--qwerty123*/,
(8, 'jennifers', 'a20aff106fe011d5dd696e3b7105200ff74331eeb8e865bb80ebd82b12665a07', 'jennifers@example.com', '8901234567') /*--password321*/,
(9, 'matthewh', '65997af054455acd2c8cb344b6ce9fb38aa1f02e03a5bc53bdcf188f26a57579', 'matthewh@example.com', '9012345678') /*--football23*/,
(10, 'emilyw', 'a68349561396ec264a350847024a4521d00beaa3358660c2709a80f31c7acdd0', 'emilyw@example.com', '1234567891') /*--welcome123*/,
(11, 'chrismiller', 'e6e07510d6531af5f403d1e6d0eb997855b6453488aaee6a9dd10ad5133f936a', 'chrismiller@example.com', '2345678902') /*--mypass123*/,
(12, 'amandal', 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae', 'amandal@example.com', '3456789013') /*--test123*/,
(13, 'jamesg', '27cc6994fc1c01ce6659c6bddca9b69c4c6a9418065e612c69d110b3f7b11f8a', 'jamesg@example.com', '4567890124') /*--hello123*/,
(14, 'oliviam', '9b0eb22aef89516d6fb4b31ccf008a68abe0d10a3fc606316389613eccf96854', 'oliviam@example.com', '5678901235') /*--letmein123*/,
(15, 'jacobt', '8d41233e39c95b5da13361e354e1c9e639f07b27d397463a8f91b71ee07ccfb2', 'jacobt@example.com', '6789012346') /*--mypassword3*/,
(16, 'meganp', 'c6ba91b90d922e159893f46c387e5dc1b3dc5c101a5a4522f03b987177a24a91', 'meganp@example.com', '7890123457') /*--password456*/,
(17, 'williams', '50e49efde4e37d84b97b14ac4f7d03ba956f1413f7367090baeabac67bf69704', 'williams@example.com', '8901234568') /*--test456*/,
(18, 'sophiaw', '6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090', 'sophiaw@example.com', '9012345679') /*--abc123*/,
(19, 'danielc', '652c7dc687d98c9889304ed2e408c74b611e86a40caa51c4b43f1dd5913c5cd0', 'danielc@example.com', '1234567892') /*--mysecret*/,
(20, 'emilyc', 'password789', 'emilyc@example.com', '2345678903') /*--password789*/;


--
-- Kľúče pre exportované tabuľky
--

--
-- Indexy pre tabuľku `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pre tabuľku `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pre tabuľku `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pre tabuľku `saved`
--
ALTER TABLE `saved`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `listing_id` (`listing_id`);

--
-- Indexy pre tabuľku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pre exportované tabuľky
--

--
-- AUTO_INCREMENT pre tabuľku `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pre tabuľku `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pre tabuľku `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pre tabuľku `saved`
--
ALTER TABLE `saved`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pre tabuľku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Obmedzenie pre exportované tabuľky
--

--
-- Obmedzenie pre tabuľku `saved`
--
ALTER TABLE `saved`
  ADD CONSTRAINT `saved_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `saved_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
