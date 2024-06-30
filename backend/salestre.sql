--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2024-06-30 20:34:49

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

DROP DATABASE salestree;
--
-- TOC entry 3461 (class 1262 OID 41486)
-- Name: salestree; Type: DATABASE; Schema: -; Owner: salestree
--

CREATE DATABASE salestree WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE salestree OWNER TO salestree;

\connect salestree

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
-- TOC entry 221 (class 1259 OID 41621)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    company_id integer NOT NULL,
    created_user integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_delete boolean DEFAULT false
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 41620)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO postgres;

--
-- TOC entry 3463 (class 0 OID 0)
-- Dependencies: 220
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- TOC entry 215 (class 1259 OID 41561)
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_delete boolean DEFAULT false
);


ALTER TABLE public.company OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 41560)
-- Name: company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.company_id_seq OWNER TO postgres;

--
-- TOC entry 3466 (class 0 OID 0)
-- Dependencies: 214
-- Name: company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;


--
-- TOC entry 219 (class 1259 OID 41596)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    user_id integer,
    created_by integer,
    role character varying(20) DEFAULT 'sales associate'::character varying NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_delete boolean DEFAULT false,
    CONSTRAINT employees_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'sales associate'::character varying])::text[]))),
    CONSTRAINT employees_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 41595)
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employees_id_seq OWNER TO postgres;

--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 218
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- TOC entry 225 (class 1259 OID 48889)
-- Name: manufacture; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.manufacture (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    company_id integer NOT NULL,
    created_user integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_delete boolean DEFAULT false,
    image character varying(255)
);


ALTER TABLE public.manufacture OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 48888)
-- Name: manufacture_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.manufacture_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.manufacture_id_seq OWNER TO postgres;

--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 224
-- Name: manufacture_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.manufacture_id_seq OWNED BY public.manufacture.id;


--
-- TOC entry 227 (class 1259 OID 48920)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    company_id integer NOT NULL,
    category_id integer NOT NULL,
    manufacture_id integer NOT NULL,
    sku character varying(100) NOT NULL,
    selling_price numeric(20,2) NOT NULL,
    barcode character varying(100) NOT NULL,
    image character varying(255) NOT NULL,
    sub_category_id integer NOT NULL,
    is_delete boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    unit character varying(100) NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 48919)
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO postgres;

--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 226
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- TOC entry 229 (class 1259 OID 48952)
-- Name: sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales (
    id integer NOT NULL,
    customer_name character varying(255) NOT NULL,
    created_user integer NOT NULL,
    total_cost integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_delete boolean DEFAULT false,
    customer_phoneno character varying(255) NOT NULL,
    cash_received integer NOT NULL,
    discount integer NOT NULL,
    cash_refund integer NOT NULL,
    payment_method character varying(255) NOT NULL,
    company_id integer NOT NULL
);


ALTER TABLE public.sales OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 48951)
-- Name: sales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sales_id_seq OWNER TO postgres;

--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 228
-- Name: sales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sales_id_seq OWNED BY public.sales.id;


--
-- TOC entry 231 (class 1259 OID 48987)
-- Name: sales_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales_item (
    id integer NOT NULL,
    sales_id integer NOT NULL,
    product_id integer NOT NULL,
    created_user integer NOT NULL,
    cost integer NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_delete boolean DEFAULT false,
    company_id integer NOT NULL
);


ALTER TABLE public.sales_item OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 48986)
-- Name: sales_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sales_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sales_item_id_seq OWNER TO postgres;

--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 230
-- Name: sales_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sales_item_id_seq OWNED BY public.sales_item.id;


--
-- TOC entry 223 (class 1259 OID 41643)
-- Name: sub_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sub_category (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    created_user integer NOT NULL,
    company_id integer NOT NULL,
    category integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_delete boolean DEFAULT false
);


ALTER TABLE public.sub_category OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 41642)
-- Name: sub_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sub_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sub_category_id_seq OWNER TO postgres;

--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 222
-- Name: sub_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sub_category_id_seq OWNED BY public.sub_category.id;


--
-- TOC entry 217 (class 1259 OID 41574)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    company_id integer NOT NULL,
    password character varying(255) NOT NULL,
    address text,
    currency character varying(10),
    timezone character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_delete boolean DEFAULT false,
    profile_image character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 41573)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3228 (class 2604 OID 41624)
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- TOC entry 3214 (class 2604 OID 41564)
-- Name: company id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 41599)
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- TOC entry 3236 (class 2604 OID 48892)
-- Name: manufacture id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manufacture ALTER COLUMN id SET DEFAULT nextval('public.manufacture_id_seq'::regclass);


--
-- TOC entry 3240 (class 2604 OID 48923)
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- TOC entry 3244 (class 2604 OID 48955)
-- Name: sales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales ALTER COLUMN id SET DEFAULT nextval('public.sales_id_seq'::regclass);


--
-- TOC entry 3248 (class 2604 OID 48990)
-- Name: sales_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales_item ALTER COLUMN id SET DEFAULT nextval('public.sales_item_id_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 41646)
-- Name: sub_category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_category ALTER COLUMN id SET DEFAULT nextval('public.sub_category_id_seq'::regclass);


--
-- TOC entry 3218 (class 2604 OID 41577)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3445 (class 0 OID 41621)
-- Dependencies: 221
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category (id, name, description, company_id, created_user, created_at, updated_at, is_delete) VALUES (2, 'categor1', 'asd', 9, 2, '2024-04-07 16:12:53.147783', '2024-04-07 16:12:53.147783', false);
INSERT INTO public.category (id, name, description, company_id, created_user, created_at, updated_at, is_delete) VALUES (3, 'electronics', 'electronic devices', 9, 2, '2024-04-07 16:13:24.39804', '2024-04-07 16:13:24.39804', false);
INSERT INTO public.category (id, name, description, company_id, created_user, created_at, updated_at, is_delete) VALUES (1, '123', '123', 9, 2, '2024-04-07 08:04:07.746572', '2024-04-07 08:04:07.746572', true);


--
-- TOC entry 3439 (class 0 OID 41561)
-- Dependencies: 215
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.company (id, name, created_at, updated_at, is_delete) VALUES (1, 'Vs', '2024-03-30 18:42:37.676849', '2024-03-30 18:42:37.676849', false);
INSERT INTO public.company (id, name, created_at, updated_at, is_delete) VALUES (2, 'Vs2', '2024-03-30 19:38:25.649317', '2024-03-30 19:38:25.649317', false);
INSERT INTO public.company (id, name, created_at, updated_at, is_delete) VALUES (3, 'Example Organization', '2024-03-30 19:41:21.903596', '2024-03-30 19:41:21.903596', false);
INSERT INTO public.company (id, name, created_at, updated_at, is_delete) VALUES (4, 'Example Organization1', '2024-03-30 19:44:38.235228', '2024-03-30 19:44:38.235228', false);
INSERT INTO public.company (id, name, created_at, updated_at, is_delete) VALUES (5, 'Example Organization2', '2024-03-30 19:44:53.797095', '2024-03-30 19:44:53.797095', false);
INSERT INTO public.company (id, name, created_at, updated_at, is_delete) VALUES (6, 'Example Organization3', '2024-03-30 19:45:33.567609', '2024-03-30 19:45:33.567609', false);
INSERT INTO public.company (id, name, created_at, updated_at, is_delete) VALUES (7, 'Example Organization4', '2024-03-30 19:46:03.703993', '2024-03-30 19:46:03.703993', false);
INSERT INTO public.company (id, name, created_at, updated_at, is_delete) VALUES (8, 'Example Organization5', '2024-03-30 19:46:24.000887', '2024-03-30 19:46:24.000887', false);
INSERT INTO public.company (id, name, created_at, updated_at, is_delete) VALUES (9, 'Vs3', '2024-03-30 19:47:25.941708', '2024-03-30 19:47:25.941708', false);
INSERT INTO public.company (id, name, created_at, updated_at, is_delete) VALUES (10, 'Vs21', '2024-03-30 20:05:35.00315', '2024-03-30 20:05:35.00315', false);
INSERT INTO public.company (id, name, created_at, updated_at, is_delete) VALUES (11, 'Vs4', '2024-03-30 20:06:48.393743', '2024-03-30 20:06:48.393743', false);
INSERT INTO public.company (id, name, created_at, updated_at, is_delete) VALUES (12, 'Vs5', '2024-03-30 20:09:19.614035', '2024-03-30 20:09:19.614035', false);


--
-- TOC entry 3443 (class 0 OID 41596)
-- Dependencies: 219
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (2, 10, 2, 'sales associate', 'inactive', '2024-04-03 00:18:02.854683', '2024-04-03 00:18:02.854683', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (3, 11, 2, 'sales associate', 'inactive', '2024-04-03 00:18:58.259632', '2024-04-03 00:18:58.259632', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (4, 12, 2, 'sales associate', 'inactive', '2024-04-03 00:19:31.524522', '2024-04-03 00:19:31.524522', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (5, 13, 2, 'sales associate', 'inactive', '2024-04-03 00:21:21.359965', '2024-04-03 00:21:21.359965', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (14, 22, 2, 'sales associate', 'active', '2024-04-04 01:56:10.991017', '2024-04-04 01:56:10.991017', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (16, 24, 2, 'sales associate', 'active', '2024-04-04 01:58:19.853845', '2024-04-04 01:58:19.853845', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (17, 25, 2, 'sales associate', 'active', '2024-04-04 01:58:56.891254', '2024-04-04 01:58:56.891254', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (18, 26, 2, 'sales associate', 'active', '2024-04-04 02:00:09.827567', '2024-04-04 02:00:09.827567', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (20, 28, 2, 'admin', 'active', '2024-04-04 02:04:09.59155', '2024-04-04 02:04:09.59155', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (22, 30, 2, 'admin', 'active', '2024-04-04 02:06:55.096943', '2024-04-04 02:06:55.096943', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (23, 31, 2, 'sales associate', 'active', '2024-04-04 02:07:30.452837', '2024-04-04 02:07:30.452837', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (26, 34, 2, 'sales associate', 'active', '2024-04-04 02:14:38.309372', '2024-04-04 02:14:38.309372', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (27, 35, 2, 'admin', 'inactive', '2024-04-04 02:16:59.497269', '2024-04-04 02:16:59.497269', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (28, 36, 2, 'sales associate', 'inactive', '2024-04-04 02:19:36.308726', '2024-04-04 02:19:36.308726', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (29, 37, 2, 'sales associate', 'active', '2024-04-04 02:20:12.12417', '2024-04-04 02:20:12.12417', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (30, 38, 2, 'admin', 'active', '2024-04-06 08:22:40.806706', '2024-04-06 08:22:40.806706', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (31, 39, 2, 'sales associate', 'active', '2024-04-06 08:28:09.274254', '2024-04-06 08:28:09.274254', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (33, 41, 2, 'admin', 'active', '2024-04-06 08:32:58.690563', '2024-04-06 08:32:58.690563', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (34, 42, 2, 'admin', 'active', '2024-04-06 08:34:26.612489', '2024-04-06 08:34:26.612489', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (35, 43, 2, 'admin', 'active', '2024-04-06 08:37:12.449288', '2024-04-06 08:37:12.449288', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (36, 44, 2, 'admin', 'active', '2024-04-06 09:14:22.518218', '2024-04-06 09:14:22.518218', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (15, 23, 2, 'sales associate', 'active', '2024-04-04 01:57:38.344437', '2024-04-04 01:57:38.344437', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (37, 45, 2, 'admin', 'active', '2024-04-07 00:39:24.888662', '2024-04-07 00:39:24.888662', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (38, 46, 2, 'sales associate', 'inactive', '2024-04-07 00:39:46.960907', '2024-04-07 00:39:46.960907', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (40, 48, 2, 'sales associate', 'active', '2024-04-07 00:41:30.156096', '2024-04-07 00:41:30.156096', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (41, 49, 2, 'sales associate', 'inactive', '2024-04-07 00:41:39.608944', '2024-04-07 00:41:39.608944', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (42, 50, 2, 'admin', 'active', '2024-04-07 00:43:51.398391', '2024-04-07 00:43:51.398391', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (43, 51, 2, 'admin', 'active', '2024-04-07 00:44:37.698196', '2024-04-07 00:44:37.698196', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (44, 52, 2, 'admin', 'active', '2024-04-07 00:45:47.652655', '2024-04-07 00:45:47.652655', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (45, 53, 2, 'admin', 'active', '2024-04-07 00:46:48.719239', '2024-04-07 00:46:48.719239', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (46, 54, 2, 'admin', 'active', '2024-04-07 00:48:42.408128', '2024-04-07 00:48:42.408128', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (47, 55, 2, 'admin', 'active', '2024-04-07 00:54:26.98875', '2024-04-07 00:54:26.98875', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (39, 47, 2, 'admin', 'active', '2024-04-07 00:40:52.661907', '2024-04-07 00:40:52.661907', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (48, 56, 2, 'sales associate', 'active', '2024-06-30 17:36:22.500153', '2024-06-30 17:36:22.500153', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (32, 40, 2, 'admin', 'inactive', '2024-04-06 08:32:17.624564', '2024-04-06 08:32:17.624564', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (24, 32, 2, 'sales associate', 'active', '2024-04-04 02:09:20.066652', '2024-04-04 02:09:20.066652', false);
INSERT INTO public.employees (id, user_id, created_by, role, status, created_at, updated_at, is_delete) VALUES (25, 33, 2, 'admin', 'active', '2024-04-04 02:10:08.473405', '2024-04-04 02:10:08.473405', false);


--
-- TOC entry 3449 (class 0 OID 48889)
-- Dependencies: 225
-- Data for Name: manufacture; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.manufacture (id, name, description, company_id, created_user, created_at, updated_at, is_delete, image) VALUES (3, 'khaadi', 'this is clothing brand.', 9, 2, '2024-05-05 23:04:58.273125', '2024-05-05 23:04:58.273125', false, 'public/uploads/manufacture/khaddi_m2nno.png ');
INSERT INTO public.manufacture (id, name, description, company_id, created_user, created_at, updated_at, is_delete, image) VALUES (2, 'samsung', 'this is electronic manufacture', 9, 2, '2024-05-05 22:28:33.597738', '2024-05-05 22:28:33.597738', false, 'public/uploads/manufacture/samsung_en6ng.png ');


--
-- TOC entry 3451 (class 0 OID 48920)
-- Dependencies: 227
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product (id, name, description, company_id, category_id, manufacture_id, sku, selling_price, barcode, image, sub_category_id, is_delete, created_at, updated_at, unit) VALUES (2, 'galaxy watch 5', 'new galaxy watch', 9, 3, 2, '1000', 200.00, '20030', 'public/uploads/manufacture/galaxy_watch_fmm7o.jpg', 8, false, '2024-06-16 16:24:45.9542', '2024-06-16 16:24:45.9542', '1000');
INSERT INTO public.product (id, name, description, company_id, category_id, manufacture_id, sku, selling_price, barcode, image, sub_category_id, is_delete, created_at, updated_at, unit) VALUES (1, 'oled display', 'Very Good', 9, 3, 2, 'PKKAS', 100.00, '100020', 'public/uploads/product/football_hhj9c.png', 5, false, '2024-06-16 16:04:04.673186', '2024-06-16 16:04:04.673186', '100');


--
-- TOC entry 3453 (class 0 OID 48952)
-- Dependencies: 229
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sales (id, customer_name, created_user, total_cost, created_at, updated_at, is_delete, customer_phoneno, cash_received, discount, cash_refund, payment_method, company_id) VALUES (6, 'Alex', 2, 300, '2024-06-30 17:06:45.782817', '2024-06-30 17:06:45.782817', false, '03362646155', 300, 50, 50, 'CASH', 9);
INSERT INTO public.sales (id, customer_name, created_user, total_cost, created_at, updated_at, is_delete, customer_phoneno, cash_received, discount, cash_refund, payment_method, company_id) VALUES (7, 'Ahmed', 2, 600, '2024-06-30 17:22:05.587613', '2024-06-30 17:22:05.587613', false, '03362646155', 600, 100, 0, 'DEBIT', 9);
INSERT INTO public.sales (id, customer_name, created_user, total_cost, created_at, updated_at, is_delete, customer_phoneno, cash_received, discount, cash_refund, payment_method, company_id) VALUES (8, 'Rauf Kaka', 56, 500, '2024-06-30 18:05:51.212636', '2024-06-30 18:05:51.212636', false, '03362646155', 600, 100, 100, 'CASH', 9);


--
-- TOC entry 3455 (class 0 OID 48987)
-- Dependencies: 231
-- Data for Name: sales_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sales_item (id, sales_id, product_id, created_user, cost, quantity, created_at, updated_at, is_delete, company_id) VALUES (2, 6, 1, 2, 100, 3, '2024-06-30 17:06:45.80687', '2024-06-30 17:06:45.80687', false, 9);
INSERT INTO public.sales_item (id, sales_id, product_id, created_user, cost, quantity, created_at, updated_at, is_delete, company_id) VALUES (3, 7, 2, 2, 200, 2, '2024-06-30 17:22:05.603409', '2024-06-30 17:22:05.603409', false, 9);
INSERT INTO public.sales_item (id, sales_id, product_id, created_user, cost, quantity, created_at, updated_at, is_delete, company_id) VALUES (4, 7, 1, 2, 100, 2, '2024-06-30 17:22:05.603499', '2024-06-30 17:22:05.603499', false, 9);
INSERT INTO public.sales_item (id, sales_id, product_id, created_user, cost, quantity, created_at, updated_at, is_delete, company_id) VALUES (6, 8, 2, 56, 200, 1, '2024-06-30 18:05:51.244741', '2024-06-30 18:05:51.244741', false, 9);
INSERT INTO public.sales_item (id, sales_id, product_id, created_user, cost, quantity, created_at, updated_at, is_delete, company_id) VALUES (5, 8, 1, 56, 100, 3, '2024-06-30 18:05:51.244587', '2024-06-30 18:05:51.244587', false, 9);


--
-- TOC entry 3447 (class 0 OID 41643)
-- Dependencies: 223
-- Data for Name: sub_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sub_category (id, name, description, created_user, company_id, category, created_at, updated_at, is_delete) VALUES (5, 'television', 'led', 2, 9, 3, '2024-04-16 22:33:27.278726', '2024-04-16 22:33:27.278726', false);
INSERT INTO public.sub_category (id, name, description, created_user, company_id, category, created_at, updated_at, is_delete) VALUES (7, 'mens watches', 'apple watches', 2, 9, 3, '2024-04-16 23:23:45.689545', '2024-04-16 23:23:45.689545', true);
INSERT INTO public.sub_category (id, name, description, created_user, company_id, category, created_at, updated_at, is_delete) VALUES (6, 'watches', 'smart watche', 2, 9, 3, '2024-04-16 23:18:43.69134', '2024-04-16 23:18:43.69134', true);
INSERT INTO public.sub_category (id, name, description, created_user, company_id, category, created_at, updated_at, is_delete) VALUES (8, 'watches', 'smart watch', 2, 9, 3, '2024-04-16 23:54:51.791614', '2024-04-16 23:54:51.791614', false);


--
-- TOC entry 3441 (class 0 OID 41574)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (1, 'John Doe', 'joh12n4.doe@example.com', 8, '$2a$10$CfbXX28BYJ8tTnfc5wbkheGV2gHIWKd2Lc9FTI/ZZGEMx4QKcsH2.', NULL, 'USD2', NULL, '2024-03-30 19:46:24.010617', '2024-03-30 19:46:24.010617', false, NULL);
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (4, 'Kashif Ali', 'l@yopmail.com', 11, '$2a$10$HfhXqfd8i1q9DxJRusDmtemPgJv2VdZm2Prt7LJKyhbIxidEw/ctq', NULL, 'AFN', 'UTC', '2024-03-30 20:06:48.396914', '2024-03-30 20:06:48.396914', false, NULL);
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (5, 'Kashif Ali', 'r@yopmail.com', 12, '$2a$10$x4q4RJDeIeNE3BW/UaSriuLpliTtKKUlcotFiL24dV8HbUet6G72y', NULL, 'AFN', 'UTC', '2024-03-30 20:09:19.615989', '2024-03-30 20:09:19.615989', false, NULL);
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (32, 'Sales Tree Web', 'asd1223@yopmail.com', 9, '$2a$10$izKUDTPC8EqxC1TcELmZCOoAYqtzQzYBAJFafYN5/wl9m2ZMo6ewe', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 02:09:20.063099', '2024-04-04 02:09:20.063099', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (14, 'Sales Tree Web', 'admin@yopmail.com', 9, '$2a$10$C0WTzrmOcV1.Y6IUstMCgOgcWv1GhWh6K4kuiNE2QdQaw07iS5cgi', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 01:47:25.553321', '2024-04-04 01:47:25.553321', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (15, 'Sales Tree Web', 'ad1@yopmail.com', 9, '$2a$10$qvNMW2CnUcwwWqsHWNGcOuxytrvU2xwMyhCbYpx7YdTypL0y.afRa', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 01:48:07.36742', '2024-04-04 01:48:07.36742', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (16, 'Sales Tree Web', 'ad12@yopmail.com', 9, '$2a$10$Jjcg1LLSabaY2/TCR0Nxa.AGK11NEOeCWPouCCq0N0oSF7t0d.fsS', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 01:49:08.492528', '2024-04-04 01:49:08.492528', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (17, 'Sales Tree Web', 'ad123@yopmail.com', 9, '$2a$10$3d0bqPUh1QGGaXtcrlpgoeS5Qosjsae5FcpxtXAyk7vfFITmDUA1K', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 01:49:42.310669', '2024-04-04 01:49:42.310669', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (18, 'Sales Tree Web', 'ad1234@yopmail.com', 9, '$2a$10$xAj68m4C885scSP4R8/2JOblhNa7bEfQA58hnWzMAjWXHyPoS5MsW', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 01:50:26.486688', '2024-04-04 01:50:26.486688', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (19, 'Sales Tree Web', 'ad12456@gmail.com', 9, '$2a$10$CU8fsD1wW9uz7iIWpdYkke5ZI0NmZkCIEYF9GoCuDUnAmXM.qr7mK', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 01:52:17.824995', '2024-04-04 01:52:17.824995', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (20, 'Sales Tree Web', 'ad124356@gmail.com', 9, '$2a$10$jr9pr9cj4e/sotcEwLOm7uoba4TdXrLElgrSQpcpAKwlEv5e8w54e', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 01:53:04.82704', '2024-04-04 01:53:04.82704', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (21, 'Sales Tree Web', 'ad1243356@gmail.com', 9, '$2a$10$A6mZsuhvlwQ2WDvefe/9teUn4LcZmKXL4BXvcOx8KaG1FKcu0E3k.', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 01:53:38.751391', '2024-04-04 01:53:38.751391', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (27, 'asd', 'a213@yopmail.com', 9, '$2a$10$1ErDIRyTcVgId4LNJw0gYuQb2gnkN7SFVQAcSrTm6jGrYqET8BYke', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 02:02:51.212101', '2024-04-04 02:02:51.212101', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (29, 'Sales Tree Web', 'a123@yopmail.com', 9, '$2a$10$sQn72kyI2Q1Eou0AO5cmqOLdCH/ToXSZNpRZoBM2i80MR5EHeYkd.', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 02:04:37.154524', '2024-04-04 02:04:37.154524', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (11, 'Employee1', 'employee2@yopmail.com', 9, '$2a$10$xqZ/ACTk.Efg8eZZ/V6OXessfm7yXPlSXP77SGHA8ECuUbNLYJ.PO', NULL, NULL, NULL, '2024-04-03 00:18:58.256172', '2024-04-03 00:18:58.256172', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (24, 'Sales Tree Web', 'ad1243332546@gmail.com', 9, '$2a$10$FbEUFDoX9V2CfcvweMMVxOPjjmpiU.VZbiU7Il/RuNimltk.jtI7a', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 01:58:19.849697', '2024-04-04 01:58:19.849697', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (25, 'Sales Tree Web', 'ad12432332546@gmail.com', 9, '$2a$10$Z50smYv1xkOXTyqtJpiCFOT7dQuo41fnrJz1YN5n172Aal8OCeMxK', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 01:58:56.888095', '2024-04-04 01:58:56.888095', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (26, 'Sales Tree Web', 'ad124322332546@gmail.com', 9, '$2a$10$zCnoO5rEGBCNq7Ftzt/I4ewuPaD4F8Ly66fulXo5YDeVnP/c6iW1K', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 02:00:09.824783', '2024-04-04 02:00:09.824783', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (28, 'Sales Tree Web', 'asd@yopmail.com', 9, '$2a$10$fR8XWPJ9V.C.lGKM0NvW3el7eCrnIgEgubLcGoQIpy4u9XQUH2IlK', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 02:04:09.588952', '2024-04-04 02:04:09.588952', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (10, 'Employee1', 'employee1@yopmail.com', 9, '$2a$10$47PRBNvktBY9mgCF7dSyhuuGJhlotHsORrLEt81YtmDkJVx.plYka', NULL, NULL, NULL, '2024-04-03 00:18:02.848146', '2024-04-03 00:18:02.848146', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (12, 'Employee1', 'employee3@yopmail.com', 9, '$2a$10$9bxB4GpuV9Y0VqVrnoTLJOheOGwTZEKz3fHUEjASOSaKxQb0qE3VK', NULL, NULL, NULL, '2024-04-03 00:19:31.520936', '2024-04-03 00:19:31.520936', true, 'public/uploads/users/1_pgi9s.png');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (13, 'Employee1', 'employee4@yopmail.com', 9, '$2a$10$xMLzGQMHaGCDlKexeLZ7L.RuIUYSzEQg4aAnBm0jJrIsV1bZ9qlki', '1KKAS ksajf', NULL, NULL, '2024-04-03 00:21:21.356447', '2024-04-03 00:21:21.356447', true, 'public/uploads/users/1_ikou2.png');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (22, 'Sales Tree Web', 'ad12433546@gmail.com', 9, '$2a$10$blZygCtOwT/9fjzUx18sS.8QEOMVR2KZY3DNI4KEGPYYyBybniVZm', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 01:56:10.987364', '2024-04-04 01:56:10.987364', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (30, 'Sales Tree Web', 'a123213@yopmail.com', 9, '$2a$10$X4J9Csy/juBp/gh45Adf.uUUItH5YHiNQvVSt2owzbm29N2DNluKW', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 02:06:55.094432', '2024-04-04 02:06:55.094432', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (34, 'Avatars', 'avas@yopmail.com', 9, '$2a$10$dvFlLL1The/FGM5w.Fz8BePKzzelb89kCvYTANokMJdmvP3/x/GT2', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 02:14:38.300828', '2024-04-04 02:14:38.300828', true, 'public/uploads/users/1699535246345_8mou1.jpg');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (35, 'Sales Tree Web', 'asdas@yopmail.com', 9, '$2a$10$E3GH7so8gxvnc2CI1WXzP.W7tGVqjpWh7XlkpKQ12zeeWl1Ks8lVq', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 02:16:59.493524', '2024-04-04 02:16:59.493524', true, 'public/uploads/users/1699535246345_s2km7.jpg');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (36, 'Sales Tree Web', 'asd34@yopmail.com', 9, '$2a$10$niaW4qRVA0ZFilJz.gQh5u4dmRvkJBcaQXAZH9YRLx1LFF5K5n.YG', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 02:19:36.305683', '2024-04-04 02:19:36.305683', true, 'public/uploads/users/1699535246345_udvyg.jpg');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (31, 'Sales Tree Web', 'asd123@yopmail.com', 9, '$2a$10$cvqdk/5rJTTGgiBl3ZcX7OMLqR.XD9Z6CIyiF3NC1lypzsyEW9sGa', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 02:07:30.448952', '2024-04-04 02:07:30.448952', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (37, '004', '004@yopmail.com', 9, '$2a$10$qeupOTdamtLRtR6g9KBqcePkLhGhh/eyMv13HqNznQYuXGlGXpG52', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 02:20:12.1219', '2024-04-04 02:20:12.1219', true, 'public/uploads/users/1_aej10.jpg');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (2, 'Kashif Ali', 'a@yopmail.com', 9, '$2a$10$lbaYrlldTKtgGWFbkbSCiu2zf9/d1St1RJCkxzkq3jbFE6bHQsamW', NULL, 'AED', 'UTC', '2024-03-30 19:47:25.944719', '2024-03-30 19:47:25.944719', false, NULL);
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (3, 'Kashif Ali', 'k@yopmail.com', 10, '$2a$10$j7C1eMjEBnM9/UZeZnrxG.4KOD3TC1KBlK9mwsGxsFHBfM9GO8KmK', NULL, 'AED', 'UTC', '2024-03-30 20:05:35.014525', '2024-03-30 20:05:35.014525', false, NULL);
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (33, 'avatars', 'avayae@yopmail.com', 9, '$2a$10$hFEY3dY2TAfMpmJZQO4KlO4zcpFX3aKixgBNHbeKx7WTB6k6aSqqW', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 02:10:08.471251', '2024-04-04 02:10:08.471251', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (43, 'New User132', 'mew1243@yopmail.com', 9, '$2a$10$U9LKkfNwh30ks2HA2qXVneAQC.hch5b9/us3aGCK05ylU6kI68EtO', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-06 08:37:12.439086', '2024-04-06 08:37:12.439086', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (52, 'avatars', 'moas@yopmail.com', 9, '$2a$10$mGQjkb/vFa7e.fRFUrtXNuo4.OLvq2d22jVMItvi.R5OPLZWhkGSS', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-07 00:45:47.647494', '2024-04-07 00:45:47.647494', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (41, 'avatars', 'kali83963@gmail.com', 9, '$2a$10$Xbt66c5N.Pj5s9ak7414ZO6NqVfmT7l0zSv9VlnowVs7Yt6iE9juy', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-06 08:32:58.686989', '2024-04-06 08:32:58.686989', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (23, 'Sales Tree Web1', 'ad124333546@gmail.com', 9, '$2a$10$Ivc.KsCfQW4ENXCA83E76.VsuHVSYbriVVbVeQeWpddz5QZ8TjcIa', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-04 01:57:38.338883', '2024-04-04 01:57:38.338883', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (38, 'New User', 'New@yopmail.com', 9, '$2a$10$aAEHVAuPQ.zDUed3DCZsTOzhpxfn1/YSHpSRLyFeKXyAfEZ8MdxOa', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-06 08:22:40.785973', '2024-04-06 08:22:40.785973', true, 'public/uploads/users/whatsapp-image-2023-12-06-at-6_78vgv.jpeg');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (44, 'new3', 'new213@yopmail.com', 9, '$2a$10$yNyHkn8dstlZHwtC015uXOZFxeM4wOTa6CG0fCXcXrIZAB6/MIOoK', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-06 09:14:22.507899', '2024-04-06 09:14:22.507899', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (42, '002', 'new5@yopmail.com', 9, '$2a$10$S4dlwSD3.jV6eokkRWg8VOcYuiajUK0mG7j0xehqwqYrH0HXNyqTu', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-06 08:34:26.607727', '2024-04-06 08:34:26.607727', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (48, 'Sales Tree Web', 'a3413@yopmail.com', 9, '$2a$10$imQaidmH4LxV0C/dQFCYteHBQDuebd7OqeC9Z6rSCqtZ.3eqiiifm', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-07 00:41:30.152194', '2024-04-07 00:41:30.152194', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (49, 'Sales Tree Web', 'a3411233@yopmail.com', 9, '$2a$10$9/2sMtVXt7OwTzisL7lAK.bOzMOvzQqCRqLmfyiqM.QV0URLTdHD.', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-07 00:41:39.607936', '2024-04-07 00:41:39.607936', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (51, 'avatars', 'bas12@yopmail.com', 9, '$2a$10$2OwuwxMFpeACn3BEbfMfeOZqZTOzqCf9a2DXsE7KhXXY1DZQqR7yq', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-07 00:44:37.695303', '2024-04-07 00:44:37.695303', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (53, 'avatars', 'apoi@yopmail.com', 9, '$2a$10$SkSFq6HX8yX6sykrWbGd1ebkMxi4nbjROzBo141NlSQISoSnOE.Cu', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-07 00:46:48.713992', '2024-04-07 00:46:48.713992', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (54, 'avatars', 'poil@yopmail.com', 9, '$2a$10$OKAPI8q..2IZIV/IivkFd.w6QPH1exgBRMa/81OzIE/0iq24a03HW', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-07 00:48:42.404815', '2024-04-07 00:48:42.404815', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (55, 'Kashif Ali', 'lkj@yopmail.com', 9, '$2a$10$DSa3WVGGkQMekHe1Vq6yv.lmzTN6n0kb6nriPXDQv5Lqyz6/Fseda', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-07 00:54:26.985043', '2024-04-07 00:54:26.985043', false, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (45, 'Sales Tree Web', 'a12sd@yopmail.com', 9, '$2a$10$pn13Ql8JcVcyzDI5avlAJeqBu9zEYSw3HgEsb3zhyX6OKRET360GW', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-07 00:39:24.879396', '2024-04-07 00:39:24.879396', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (39, 'New User2', 'new2@yopmail.com', 9, '$2a$10$gZmSVsJtYajS34Y2Gc31eOGAi8cH9goc/LvSk75qG0RqveIBCJpOi', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-06 08:28:09.262588', '2024-04-06 08:28:09.262588', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (50, 'Kashif Ali', 'asd13124@yopmail.com', 9, '$2a$10$DE.4vNzR6FCSs9CJeaJxh.6WG4gcFv.tzdgRLuMqy/funsCgPdNZS', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-07 00:43:51.395413', '2024-04-07 00:43:51.395413', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (46, 'Sales Tree Web', 'a12dasd@yopmail.com', 9, '$2a$10$HJcs0l77LdlAfb1el1pvX.142vptdxucU.L6Mxd.65swrqH8coTmC', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-07 00:39:46.958172', '2024-04-07 00:39:46.958172', true, 'undefined');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (47, 'Sales Tree Web', 'asd213@yopmail.com', 9, '$2a$10$27lZ6TNhotlgsBVTzuGjG.W6BTe1lCPGmItinqCh8rzcD9cS72qjO', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-07 00:40:52.658255', '2024-04-07 00:40:52.658255', false, 'public/uploads/users/whatsapp-image-2023-12-06-at-6_7ik1a.jpeg');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (56, 'Abdul Moiz', 'moiz@yopmail.com', 9, '$2a$10$lmlFeZJXoGC8kGqhpqy07ukVdubjj5wvOPjQ3p/QzuDU5plDLjUaW', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-06-30 17:36:22.486148', '2024-06-30 17:36:22.486148', false, 'public/uploads/users/images_zspjy.jfif');
INSERT INTO public.users (id, name, email, company_id, password, address, currency, timezone, created_at, updated_at, is_delete, profile_image) VALUES (40, 'New User4', 'new3@yopmail.com', 9, '$2a$10$plwTALSXVbuSLvprGFHGMeKQqdxKX5d40oRfyB3dvnPcGPUhSSX3O', 'House no 299/A block 7 Karachi Adminstration Employee Coperation Housing Society', NULL, NULL, '2024-04-06 08:32:17.61261', '2024-04-06 08:32:17.61261', false, 'undefined');


--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 220
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 3, true);


--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 214
-- Name: company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.company_id_seq', 12, true);


--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 218
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 48, true);


--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 224
-- Name: manufacture_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.manufacture_id_seq', 3, true);


--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 226
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 2, true);


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 228
-- Name: sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_id_seq', 8, true);


--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 230
-- Name: sales_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_item_id_seq', 6, true);


--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 222
-- Name: sub_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sub_category_id_seq', 8, true);


--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 56, true);


--
-- TOC entry 3265 (class 2606 OID 41631)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- TOC entry 3255 (class 2606 OID 41571)
-- Name: company company_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_name_key UNIQUE (name);


--
-- TOC entry 3257 (class 2606 OID 41569)
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- TOC entry 3263 (class 2606 OID 41608)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- TOC entry 3269 (class 2606 OID 48899)
-- Name: manufacture manufacture_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manufacture
    ADD CONSTRAINT manufacture_pkey PRIMARY KEY (id);


--
-- TOC entry 3271 (class 2606 OID 48927)
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- TOC entry 3275 (class 2606 OID 48995)
-- Name: sales_item sales_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales_item
    ADD CONSTRAINT sales_item_pkey PRIMARY KEY (id);


--
-- TOC entry 3273 (class 2606 OID 48960)
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);


--
-- TOC entry 3267 (class 2606 OID 41653)
-- Name: sub_category sub_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_category
    ADD CONSTRAINT sub_category_pkey PRIMARY KEY (id);


--
-- TOC entry 3259 (class 2606 OID 41587)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3261 (class 2606 OID 41585)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3279 (class 2606 OID 41637)
-- Name: category category_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id) ON DELETE CASCADE;


--
-- TOC entry 3280 (class 2606 OID 41632)
-- Name: category category_created_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_created_user_fkey FOREIGN KEY (created_user) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3277 (class 2606 OID 41614)
-- Name: employees employees_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3278 (class 2606 OID 41609)
-- Name: employees employees_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3290 (class 2606 OID 49013)
-- Name: sales fk_company; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES public.company(id) ON DELETE CASCADE;


--
-- TOC entry 3292 (class 2606 OID 49018)
-- Name: sales_item fk_company; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales_item
    ADD CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES public.company(id) ON DELETE CASCADE;


--
-- TOC entry 3284 (class 2606 OID 48905)
-- Name: manufacture manufacture_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manufacture
    ADD CONSTRAINT manufacture_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id) ON DELETE CASCADE;


--
-- TOC entry 3285 (class 2606 OID 48900)
-- Name: manufacture manufacture_created_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manufacture
    ADD CONSTRAINT manufacture_created_user_fkey FOREIGN KEY (created_user) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3286 (class 2606 OID 48933)
-- Name: product product_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id) ON DELETE CASCADE;


--
-- TOC entry 3287 (class 2606 OID 48928)
-- Name: product product_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id) ON DELETE CASCADE;


--
-- TOC entry 3288 (class 2606 OID 48938)
-- Name: product product_manufacture_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_manufacture_id_fkey FOREIGN KEY (manufacture_id) REFERENCES public.manufacture(id) ON DELETE CASCADE;


--
-- TOC entry 3289 (class 2606 OID 48943)
-- Name: product product_sub_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_sub_category_id_fkey FOREIGN KEY (sub_category_id) REFERENCES public.sub_category(id) ON DELETE CASCADE;


--
-- TOC entry 3291 (class 2606 OID 48961)
-- Name: sales sales_created_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_created_user_fkey FOREIGN KEY (created_user) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3293 (class 2606 OID 48996)
-- Name: sales_item sales_item_created_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales_item
    ADD CONSTRAINT sales_item_created_user_fkey FOREIGN KEY (created_user) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3294 (class 2606 OID 49006)
-- Name: sales_item sales_item_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales_item
    ADD CONSTRAINT sales_item_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE CASCADE;


--
-- TOC entry 3295 (class 2606 OID 49001)
-- Name: sales_item sales_item_sales_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales_item
    ADD CONSTRAINT sales_item_sales_id_fkey FOREIGN KEY (sales_id) REFERENCES public.sales(id) ON DELETE CASCADE;


--
-- TOC entry 3281 (class 2606 OID 41664)
-- Name: sub_category sub_category_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_category
    ADD CONSTRAINT sub_category_category_fkey FOREIGN KEY (category) REFERENCES public.category(id) ON DELETE CASCADE;


--
-- TOC entry 3282 (class 2606 OID 41659)
-- Name: sub_category sub_category_company_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_category
    ADD CONSTRAINT sub_category_company_fkey FOREIGN KEY (company_id) REFERENCES public.company(id) ON DELETE CASCADE;


--
-- TOC entry 3283 (class 2606 OID 41654)
-- Name: sub_category sub_category_created_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_category
    ADD CONSTRAINT sub_category_created_user_fkey FOREIGN KEY (created_user) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3276 (class 2606 OID 41588)
-- Name: users users_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id) ON DELETE CASCADE;


--
-- TOC entry 3462 (class 0 OID 0)
-- Dependencies: 221
-- Name: TABLE category; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.category TO salestree;


--
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 220
-- Name: SEQUENCE category_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.category_id_seq TO salestree;


--
-- TOC entry 3465 (class 0 OID 0)
-- Dependencies: 215
-- Name: TABLE company; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.company TO salestree;


--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 214
-- Name: SEQUENCE company_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.company_id_seq TO salestree;


--
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 219
-- Name: TABLE employees; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.employees TO salestree;


--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 218
-- Name: SEQUENCE employees_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.employees_id_seq TO salestree;


--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 225
-- Name: TABLE manufacture; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.manufacture TO salestree;


--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 224
-- Name: SEQUENCE manufacture_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT USAGE,UPDATE ON SEQUENCE public.manufacture_id_seq TO salestree;


--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 227
-- Name: TABLE product; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.product TO salestree;


--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 226
-- Name: SEQUENCE product_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.product_id_seq TO salestree;


--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 229
-- Name: TABLE sales; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.sales TO salestree;


--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 228
-- Name: SEQUENCE sales_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.sales_id_seq TO salestree;


--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 231
-- Name: TABLE sales_item; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.sales_item TO salestree;


--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 230
-- Name: SEQUENCE sales_item_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.sales_item_id_seq TO salestree;


--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 223
-- Name: TABLE sub_category; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.sub_category TO salestree;


--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 222
-- Name: SEQUENCE sub_category_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.sub_category_id_seq TO salestree;


--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 217
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO salestree;


--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 216
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.users_id_seq TO salestree;


--
-- TOC entry 2075 (class 826 OID 41593)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO salestree;


-- Completed on 2024-06-30 20:34:50

--
-- PostgreSQL database dump complete
--

