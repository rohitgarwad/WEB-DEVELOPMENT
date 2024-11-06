--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    galaxy_age integer,
    galaxy_discription text,
    life_exists boolean
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30),
    moon_size numeric,
    planet_id integer NOT NULL,
    moon_discription text
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30),
    planet_size numeric,
    planet_life_support boolean,
    star_id integer NOT NULL,
    planet_discription text
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: planets_per_star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planets_per_star (
    star_id integer NOT NULL,
    planet_id integer NOT NULL,
    planets_per_star_id integer NOT NULL,
    name character varying(30)
);


ALTER TABLE public.planets_per_star OWNER TO freecodecamp;

--
-- Name: planets_per_star_planets_per_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planets_per_star_planets_per_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planets_per_star_planets_per_star_id_seq OWNER TO freecodecamp;

--
-- Name: planets_per_star_planets_per_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planets_per_star_planets_per_star_id_seq OWNED BY public.planets_per_star.planets_per_star_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30),
    star_age integer,
    galaxy_id integer NOT NULL,
    star_discription text
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: planets_per_star planets_per_star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planets_per_star ALTER COLUMN planets_per_star_id SET DEFAULT nextval('public.planets_per_star_planets_per_star_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milkyway_1', 100000, 'This is a first galaxy', true);
INSERT INTO public.galaxy VALUES (2, 'Milkyway_2', 200000, 'This is a second galaxy', false);
INSERT INTO public.galaxy VALUES (3, 'Milkyway_3', 300000, 'This is a third galaxy', true);
INSERT INTO public.galaxy VALUES (4, 'Milkyway_4', 400000, 'This is a fourth galaxy', false);
INSERT INTO public.galaxy VALUES (5, 'Milkyway_5', 500000, 'This is a fifth galaxy', true);
INSERT INTO public.galaxy VALUES (6, 'Milkyway_6', 600000, 'This is a sixth galaxy', false);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon_1', 1000, 1, NULL);
INSERT INTO public.moon VALUES (2, 'Moon_2', 2000, 1, NULL);
INSERT INTO public.moon VALUES (3, 'Moon_3', 3000, 2, NULL);
INSERT INTO public.moon VALUES (4, 'Moon_4', 4000, 2, NULL);
INSERT INTO public.moon VALUES (5, 'Moon_5', 5000, 3, NULL);
INSERT INTO public.moon VALUES (6, 'Moon_6', 6000, 3, NULL);
INSERT INTO public.moon VALUES (7, 'Moon_7', 7000, 4, NULL);
INSERT INTO public.moon VALUES (8, 'Moon_8', 8000, 4, NULL);
INSERT INTO public.moon VALUES (9, 'Moon_9', 9000, 5, NULL);
INSERT INTO public.moon VALUES (10, 'Moon_10', 10000, 5, NULL);
INSERT INTO public.moon VALUES (11, 'Moon_11', 11000, 6, NULL);
INSERT INTO public.moon VALUES (12, 'Moon_12', 12000, 7, NULL);
INSERT INTO public.moon VALUES (13, 'Moon_13', 13000, 7, NULL);
INSERT INTO public.moon VALUES (14, 'Moon_14', 14000, 8, NULL);
INSERT INTO public.moon VALUES (15, 'Moon_15', 15000, 8, NULL);
INSERT INTO public.moon VALUES (16, 'Moon_16', 16000, 9, NULL);
INSERT INTO public.moon VALUES (17, 'Moon_17', 17000, 9, NULL);
INSERT INTO public.moon VALUES (18, 'Moon_18', 18000, 10, NULL);
INSERT INTO public.moon VALUES (19, 'Moon_19', 19000, 10, NULL);
INSERT INTO public.moon VALUES (20, 'Moon_20', 20000, 11, NULL);
INSERT INTO public.moon VALUES (21, 'Moon_21', 21000, 11, NULL);
INSERT INTO public.moon VALUES (22, 'Moon_22', 22000, 12, NULL);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Planet_1', 10000, true, 1, NULL);
INSERT INTO public.planet VALUES (2, 'Planet_2', 20000, false, 1, NULL);
INSERT INTO public.planet VALUES (3, 'Planet_3', 11000, false, 2, NULL);
INSERT INTO public.planet VALUES (4, 'Planet_4', 21000, true, 2, NULL);
INSERT INTO public.planet VALUES (5, 'Planet_5', 12000, false, 3, NULL);
INSERT INTO public.planet VALUES (6, 'Planet_6', 22000, false, 3, NULL);
INSERT INTO public.planet VALUES (7, 'Planet_7', 13000, false, 4, NULL);
INSERT INTO public.planet VALUES (8, 'Planet_8', 23000, false, 4, NULL);
INSERT INTO public.planet VALUES (9, 'Planet_9', 14000, true, 5, NULL);
INSERT INTO public.planet VALUES (10, 'Planet_10', 24000, false, 5, NULL);
INSERT INTO public.planet VALUES (11, 'Planet_11', 15000, false, 6, NULL);
INSERT INTO public.planet VALUES (12, 'Planet_12', 25000, false, 6, NULL);


--
-- Data for Name: planets_per_star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planets_per_star VALUES (1, 1, 1, NULL);
INSERT INTO public.planets_per_star VALUES (1, 2, 2, NULL);
INSERT INTO public.planets_per_star VALUES (2, 3, 3, NULL);
INSERT INTO public.planets_per_star VALUES (2, 4, 4, NULL);
INSERT INTO public.planets_per_star VALUES (3, 5, 5, NULL);
INSERT INTO public.planets_per_star VALUES (3, 6, 6, NULL);
INSERT INTO public.planets_per_star VALUES (4, 7, 7, NULL);
INSERT INTO public.planets_per_star VALUES (4, 8, 8, NULL);
INSERT INTO public.planets_per_star VALUES (5, 9, 9, NULL);
INSERT INTO public.planets_per_star VALUES (5, 10, 10, NULL);
INSERT INTO public.planets_per_star VALUES (6, 11, 11, NULL);
INSERT INTO public.planets_per_star VALUES (6, 12, 12, NULL);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Star_1', 10000, 1, NULL);
INSERT INTO public.star VALUES (2, 'Star_2', 20000, 1, NULL);
INSERT INTO public.star VALUES (3, 'Star_3', 30000, 2, NULL);
INSERT INTO public.star VALUES (4, 'Star_4', 40000, 2, NULL);
INSERT INTO public.star VALUES (5, 'Star_5', 50000, 3, NULL);
INSERT INTO public.star VALUES (6, 'Star_6', 60000, 4, NULL);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 23, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: planets_per_star_planets_per_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planets_per_star_planets_per_star_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: galaxy galaxy_galaxy_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_galaxy_id_key UNIQUE (galaxy_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_moon_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_moon_id_key UNIQUE (moon_id);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: planet planet_planet_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_planet_id_key UNIQUE (planet_id);


--
-- Name: planets_per_star planets_per_star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planets_per_star
    ADD CONSTRAINT planets_per_star_pkey PRIMARY KEY (planets_per_star_id);


--
-- Name: planets_per_star planets_per_star_planets_per_star_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planets_per_star
    ADD CONSTRAINT planets_per_star_planets_per_star_id_key UNIQUE (planets_per_star_id);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: star star_star_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_star_id_key UNIQUE (star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: planets_per_star planets_per_star_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planets_per_star
    ADD CONSTRAINT planets_per_star_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planets_per_star planets_per_star_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planets_per_star
    ADD CONSTRAINT planets_per_star_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

