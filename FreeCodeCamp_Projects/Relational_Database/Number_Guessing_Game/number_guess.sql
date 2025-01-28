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

DROP DATABASE number_guessing_game;
--
-- Name: number_guessing_game; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guessing_game WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guessing_game OWNER TO freecodecamp;

\connect number_guessing_game

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
-- Name: game_info; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.game_info (
    game_id integer NOT NULL,
    game_score integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.game_info OWNER TO freecodecamp;

--
-- Name: game_info_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.game_info_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.game_info_game_id_seq OWNER TO freecodecamp;

--
-- Name: game_info_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.game_info_game_id_seq OWNED BY public.game_info.game_id;


--
-- Name: user_info; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.user_info (
    user_id integer NOT NULL,
    username character varying(22) NOT NULL
);


ALTER TABLE public.user_info OWNER TO freecodecamp;

--
-- Name: user_info_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.user_info_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_info_user_id_seq OWNER TO freecodecamp;

--
-- Name: user_info_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.user_info_user_id_seq OWNED BY public.user_info.user_id;


--
-- Name: game_info game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.game_info ALTER COLUMN game_id SET DEFAULT nextval('public.game_info_game_id_seq'::regclass);


--
-- Name: user_info user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.user_info ALTER COLUMN user_id SET DEFAULT nextval('public.user_info_user_id_seq'::regclass);


--
-- Data for Name: game_info; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.game_info VALUES (1, 10, 4);
INSERT INTO public.game_info VALUES (2, 7, 4);
INSERT INTO public.game_info VALUES (3, 16, 4);
INSERT INTO public.game_info VALUES (4, 11, 4);
INSERT INTO public.game_info VALUES (5, 1001, 5);
INSERT INTO public.game_info VALUES (6, 322, 5);
INSERT INTO public.game_info VALUES (7, 856, 6);
INSERT INTO public.game_info VALUES (8, 925, 6);
INSERT INTO public.game_info VALUES (9, 723, 5);
INSERT INTO public.game_info VALUES (10, 573, 5);
INSERT INTO public.game_info VALUES (11, 818, 5);
INSERT INTO public.game_info VALUES (12, 952, 7);
INSERT INTO public.game_info VALUES (13, 422, 7);
INSERT INTO public.game_info VALUES (14, 50, 8);
INSERT INTO public.game_info VALUES (15, 603, 8);
INSERT INTO public.game_info VALUES (16, 603, 7);
INSERT INTO public.game_info VALUES (17, 896, 7);
INSERT INTO public.game_info VALUES (18, 649, 7);
INSERT INTO public.game_info VALUES (19, 269, 9);
INSERT INTO public.game_info VALUES (20, 802, 9);
INSERT INTO public.game_info VALUES (21, 10, 10);
INSERT INTO public.game_info VALUES (22, 646, 10);
INSERT INTO public.game_info VALUES (23, 749, 9);
INSERT INTO public.game_info VALUES (24, 769, 9);
INSERT INTO public.game_info VALUES (25, 489, 9);
INSERT INTO public.game_info VALUES (26, 285, 11);
INSERT INTO public.game_info VALUES (27, 461, 11);
INSERT INTO public.game_info VALUES (28, 580, 12);
INSERT INTO public.game_info VALUES (29, 256, 12);
INSERT INTO public.game_info VALUES (30, 425, 11);
INSERT INTO public.game_info VALUES (31, 608, 11);
INSERT INTO public.game_info VALUES (32, 860, 11);


--
-- Data for Name: user_info; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.user_info VALUES (4, 'Me');
INSERT INTO public.user_info VALUES (5, 'user_1738067577746');
INSERT INTO public.user_info VALUES (6, 'user_1738067577745');
INSERT INTO public.user_info VALUES (7, 'user_1738067743567');
INSERT INTO public.user_info VALUES (8, 'user_1738067743566');
INSERT INTO public.user_info VALUES (9, 'user_1738067747707');
INSERT INTO public.user_info VALUES (10, 'user_1738067747706');
INSERT INTO public.user_info VALUES (11, 'user_1738068322118');
INSERT INTO public.user_info VALUES (12, 'user_1738068322117');


--
-- Name: game_info_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.game_info_game_id_seq', 32, true);


--
-- Name: user_info_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.user_info_user_id_seq', 12, true);


--
-- Name: game_info game_info_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.game_info
    ADD CONSTRAINT game_info_pkey PRIMARY KEY (game_id);


--
-- Name: user_info user_info_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (user_id);


--
-- Name: user_info user_info_username_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_username_key UNIQUE (username);


--
-- Name: game_info game_info_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.game_info
    ADD CONSTRAINT game_info_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_info(user_id);


--
-- PostgreSQL database dump complete
--

