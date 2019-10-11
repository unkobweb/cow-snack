-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  jeu. 10 oct. 2019 à 10:52
-- Version du serveur :  10.3.16-MariaDB
-- Version de PHP :  7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `cow_snack`
--

-- --------------------------------------------------------

--
-- Structure de la table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `firstname` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `mail` varchar(255) COLLATE utf8_bin NOT NULL,
  `phone` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `composition`
--

CREATE TABLE `composition` (
  `id` int(11) NOT NULL,
  `sandwich_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `composition`
--

INSERT INTO `composition` (`id`, `sandwich_id`, `ingredient_id`) VALUES
(1, 1, 1),
(2, 1, 13),
(3, 1, 11),
(4, 1, 12),
(5, 1, 14),
(6, 2, 8),
(7, 2, 16),
(8, 2, 36),
(9, 2, 14),
(10, 3, 2),
(11, 3, 36),
(12, 4, 6),
(13, 4, 4),
(14, 4, 14),
(15, 4, 17),
(16, 5, 8),
(17, 5, 15),
(18, 5, 16),
(19, 5, 19),
(20, 6, 1),
(21, 6, 5),
(22, 6, 15),
(23, 6, 16),
(24, 6, 21),
(25, 7, 6),
(26, 7, 7),
(27, 7, 14),
(28, 7, 16),
(29, 7, 19),
(30, 8, 1),
(31, 8, 15),
(32, 8, 16),
(33, 8, 13),
(34, 8, 21),
(35, 9, 4),
(36, 9, 11),
(37, 9, 15),
(38, 9, 23);

-- --------------------------------------------------------

--
-- Structure de la table `purchase`
--

CREATE TABLE `purchase` (
  `id` int(11) NOT NULL,
  `composition_id` int(11) NOT NULL,
  `user_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `user_phone` varchar(10) COLLATE utf8_bin NOT NULL,
  `sandwich_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `ordering_date` datetime NOT NULL DEFAULT current_timestamp(),
  `delivery_date` date NOT NULL,
  `user_precision` text COLLATE utf8_bin NOT NULL,
  `size` varchar(255) COLLATE utf8_bin NOT NULL,
  `drink` varchar(255) COLLATE utf8_bin NOT NULL,
  `dessert` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `rate`
--

CREATE TABLE `rate` (
  `id` int(11) NOT NULL,
  `purchase_id` int(11) NOT NULL,
  `mark` tinyint(4) NOT NULL,
  `user_precision` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `sandwich`
--

CREATE TABLE `sandwich` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `composition_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `sandwich`
--

INSERT INTO `sandwich` (`id`, `name`, `composition_id`) VALUES
(1, 'COW-GOOD', 1),
(2, 'COW-LOVE', 2),
(3, 'COW-CLASSIQUE', 3),
(4, 'COW-MA', 4),
(5, 'COW-HEALTHY', 5),
(6, 'COW-PASBOY', 6),
(7, 'COW-GIRL', 7),
(8, 'COW-WORK', 8),
(9, 'COW-WITHOUT-COW', 9);

-- --------------------------------------------------------

--
-- Structure de la table `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `size_slug` varchar(255) COLLATE utf8_bin NOT NULL,
  `size_label` varchar(255) COLLATE utf8_bin NOT NULL,
  `price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `size`
--

INSERT INTO `size` (`id`, `size_slug`, `size_label`, `price`) VALUES
(1, 'small', 'S', '4'),
(2, 'medium', 'M', '5'),
(3, 'large', 'L', '7');

-- --------------------------------------------------------

--
-- Structure de la table `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `slug` varchar(255) COLLATE utf8_bin NOT NULL,
  `label` varchar(255) COLLATE utf8_bin NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `stock`
--

INSERT INTO `stock` (`id`, `type`, `slug`, `label`, `quantity`) VALUES
(1, 1, 'steak', 'Steak', 1),
(2, 1, 'jambon_blanc', 'Jambon blanc', 1),
(3, 1, 'jambon_bayonne', 'Jambon bayonne', 1),
(4, 1, 'nuggets', 'Nuggets', 1),
(5, 1, 'saucisse', 'Saucisse', 1),
(6, 1, 'merguez', 'Merguez', 1),
(7, 1, 'cordon_bleu', 'Cordon bleu', 1),
(8, 1, 'emince_poulet', 'Emincé de poulet', 1),
(9, 1, 'saucisson', 'Saucisson', 1),
(10, 1, 'salami', 'Salami', 1),
(11, 2, 'bacon', 'Bacon', 1),
(12, 2, 'lardons', 'Lardons', 1),
(13, 2, 'cheddar', 'Cheddar', 1),
(14, 2, 'gruyere', 'Gruyère', 1),
(15, 2, 'salade', 'Salade', 1),
(16, 2, 'tomate', 'Tomate', 1),
(17, 2, 'pates', 'Pâtes', 1),
(18, 2, 'oignon', 'Oignon', 1),
(19, 3, 'ketchup', 'Ketchup', 1),
(20, 3, 'mayo', 'Mayonnaise', 1),
(21, 3, 'biggy', 'Biggy', 1),
(22, 3, 'curry', 'Curry', 1),
(23, 3, 'bbq_miel', 'Barbecue-Miel', 1),
(24, 4, 'coca', 'Coca', 1),
(25, 4, 'orangina', 'Orangina', 1),
(26, 4, 'oasis', 'Oasis', 1),
(27, 4, 'pepsi', 'Pepsi', 1),
(28, 4, 'sprite', 'Sprite', 1),
(29, 4, '7up', '7up', 1),
(30, 4, 'tropico', 'Tropico', 1),
(31, 4, 'ice_tea', 'Ice Tea', 1),
(32, 4, 'fanta', 'Fanta', 1),
(33, 5, 'panini_nutella', 'Panini Nutella', 1),
(34, 5, 'panini_confiture', 'Panini confiture', 1),
(35, 5, 'cookies', 'Cookies', 1),
(36, 3, 'beurre', 'Beurre', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `composition`
--
ALTER TABLE `composition`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sandwich`
--
ALTER TABLE `sandwich`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `composition`
--
ALTER TABLE `composition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT pour la table `purchase`
--
ALTER TABLE `purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `rate`
--
ALTER TABLE `rate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sandwich`
--
ALTER TABLE `sandwich`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
