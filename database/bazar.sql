-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: 127.0.0.1
-- Čas generovania: So 13.Máj 2023, 22:35
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
(1, 'johnsmith', 'mypassword1', 'johnsmith@example.com', '1234567890'),
(2, 'janeDoe', 'password123', 'janedoe@example.com', '2345678901'),
(3, 'michalPichal', 'ilovemusic', 'michaelj@example.com', '3456789012'),
(4, 'sarahc', 'letmein', 'sarahc@example.com', '4567890123'),
(5, 'davidm', 'secretword', 'davidm@example.com', '5678901234'),
(6, 'laurabrown', 'mypassword2', 'laurabrown@example.com', '6789012345'),
(7, 'robertw', 'qwerty123', 'robertw@example.com', '7890123456'),
(8, 'jennifers', 'password321', 'jennifers@example.com', '8901234567'),
(9, 'matthewh', 'football23', 'matthewh@example.com', '9012345678'),
(10, 'emilyw', 'welcome123', 'emilyw@example.com', '1234567891'),
(11, 'chrismiller', 'mypass123', 'chrismiller@example.com', '2345678902'),
(12, 'amandal', 'test123', 'amandal@example.com', '3456789013'),
(13, 'jamesg', 'hello123', 'jamesg@example.com', '4567890124'),
(14, 'oliviam', 'letmein123', 'oliviam@example.com', '5678901235'),
(15, 'jacobt', 'mypassword3', 'jacobt@example.com', '6789012346'),
(16, 'meganp', 'password456', 'meganp@example.com', '7890123457'),
(17, 'williams', 'test456', 'williams@example.com', '8901234568'),
(18, 'sophiaw', 'abc123', 'sophiaw@example.com', '9012345679'),
(19, 'danielc', 'mysecret', 'danielc@example.com', '1234567892'),
(20, 'emilyc', 'password789', 'emilyc@example.com', '2345678903');

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
-- AUTO_INCREMENT pre tabuľku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
