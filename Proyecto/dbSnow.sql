PGDMP                          |            BD_SnowStyle    12.15    12.15 T    r           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            s           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            t           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            u           1262    16993    BD_SnowStyle    DATABASE     �   CREATE DATABASE "BD_SnowStyle" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_El Salvador.1252' LC_CTYPE = 'Spanish_El Salvador.1252';
    DROP DATABASE "BD_SnowStyle";
                postgres    false            �            1259    17119    carrito    TABLE     �   CREATE TABLE public.carrito (
    id_carrito integer NOT NULL,
    id_usuario integer,
    id_prenda integer,
    estado_carrito character varying(255)
);
    DROP TABLE public.carrito;
       public         heap    postgres    false            �            1259    17117    carrito_id_carrito_seq    SEQUENCE     �   CREATE SEQUENCE public.carrito_id_carrito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.carrito_id_carrito_seq;
       public          postgres    false    219            v           0    0    carrito_id_carrito_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.carrito_id_carrito_seq OWNED BY public.carrito.id_carrito;
          public          postgres    false    218            �            1259    17028    departamento    TABLE     n   CREATE TABLE public.departamento (
    id_departamento integer NOT NULL,
    nombre character varying(255)
);
     DROP TABLE public.departamento;
       public         heap    postgres    false            �            1259    17026     departamento_id_departamento_seq    SEQUENCE     �   CREATE SEQUENCE public.departamento_id_departamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.departamento_id_departamento_seq;
       public          postgres    false    207            w           0    0     departamento_id_departamento_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.departamento_id_departamento_seq OWNED BY public.departamento.id_departamento;
          public          postgres    false    206            �            1259    17101    detalle_factura    TABLE     �   CREATE TABLE public.detalle_factura (
    id_detalle_factura integer NOT NULL,
    id_factura integer,
    id_prenda integer
);
 #   DROP TABLE public.detalle_factura;
       public         heap    postgres    false            �            1259    17099 &   detalle_factura_id_detalle_factura_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_factura_id_detalle_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.detalle_factura_id_detalle_factura_seq;
       public          postgres    false    217            x           0    0 &   detalle_factura_id_detalle_factura_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.detalle_factura_id_detalle_factura_seq OWNED BY public.detalle_factura.id_detalle_factura;
          public          postgres    false    216            �            1259    17044    factura    TABLE     �   CREATE TABLE public.factura (
    id_factura integer NOT NULL,
    codigo character varying(255),
    fecha date,
    id_cliente integer
);
    DROP TABLE public.factura;
       public         heap    postgres    false            �            1259    17042    factura_id_factura_seq    SEQUENCE     �   CREATE SEQUENCE public.factura_id_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.factura_id_factura_seq;
       public          postgres    false    211            y           0    0    factura_id_factura_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.factura_id_factura_seq OWNED BY public.factura.id_factura;
          public          postgres    false    210            �            1259    17137    items_carrito    TABLE     �   CREATE TABLE public.items_carrito (
    id_itemcarrito integer NOT NULL,
    id_carrito integer,
    id_prenda integer,
    cantidad integer
);
 !   DROP TABLE public.items_carrito;
       public         heap    postgres    false            �            1259    17135     items_carrito_id_itemcarrito_seq    SEQUENCE     �   CREATE SEQUENCE public.items_carrito_id_itemcarrito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.items_carrito_id_itemcarrito_seq;
       public          postgres    false    221            z           0    0     items_carrito_id_itemcarrito_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.items_carrito_id_itemcarrito_seq OWNED BY public.items_carrito.id_itemcarrito;
          public          postgres    false    220            �            1259    17052    marca    TABLE     �   CREATE TABLE public.marca (
    id_marca integer NOT NULL,
    nom_marca character varying(255),
    codigo character varying(7)
);
    DROP TABLE public.marca;
       public         heap    postgres    false            �            1259    17050    marca_id_marca_seq    SEQUENCE     �   CREATE SEQUENCE public.marca_id_marca_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.marca_id_marca_seq;
       public          postgres    false    213            {           0    0    marca_id_marca_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.marca_id_marca_seq OWNED BY public.marca.id_marca;
          public          postgres    false    212            �            1259    17073    prenda    TABLE     �   CREATE TABLE public.prenda (
    id_prenda integer NOT NULL,
    id_marca integer,
    id_departamento integer,
    id_talla integer,
    disponibilidad integer,
    cantidad integer,
    id_proveedor integer,
    precio_unitario numeric(10,2)
);
    DROP TABLE public.prenda;
       public         heap    postgres    false            �            1259    17071    prenda_id_prenda_seq    SEQUENCE     �   CREATE SEQUENCE public.prenda_id_prenda_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.prenda_id_prenda_seq;
       public          postgres    false    215            |           0    0    prenda_id_prenda_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.prenda_id_prenda_seq OWNED BY public.prenda.id_prenda;
          public          postgres    false    214            �            1259    17036 	   proveedor    TABLE     p   CREATE TABLE public.proveedor (
    id_proveedor integer NOT NULL,
    name_proveedor character varying(500)
);
    DROP TABLE public.proveedor;
       public         heap    postgres    false            �            1259    17034    proveedor_id_proveedor_seq    SEQUENCE     �   CREATE SEQUENCE public.proveedor_id_proveedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.proveedor_id_proveedor_seq;
       public          postgres    false    209            }           0    0    proveedor_id_proveedor_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.proveedor_id_proveedor_seq OWNED BY public.proveedor.id_proveedor;
          public          postgres    false    208            �            1259    17020    talla    TABLE     �   CREATE TABLE public.talla (
    id_talla integer NOT NULL,
    nom_talla character varying(5),
    codigo character varying(7)
);
    DROP TABLE public.talla;
       public         heap    postgres    false            �            1259    17018    talla_id_talla_seq    SEQUENCE     �   CREATE SEQUENCE public.talla_id_talla_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.talla_id_talla_seq;
       public          postgres    false    205            ~           0    0    talla_id_talla_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.talla_id_talla_seq OWNED BY public.talla.id_talla;
          public          postgres    false    204            �            1259    17009    usuario    TABLE       CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nombre character varying(255),
    correo_electronico character varying(255),
    "contraseña" character varying(255),
    direccion character varying(255),
    telefono integer,
    dui character varying(10)
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    17007    usuario_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.usuario_id_usuario_seq;
       public          postgres    false    203                       0    0    usuario_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;
          public          postgres    false    202            �
           2604    17122    carrito id_carrito    DEFAULT     x   ALTER TABLE ONLY public.carrito ALTER COLUMN id_carrito SET DEFAULT nextval('public.carrito_id_carrito_seq'::regclass);
 A   ALTER TABLE public.carrito ALTER COLUMN id_carrito DROP DEFAULT;
       public          postgres    false    219    218    219            �
           2604    17031    departamento id_departamento    DEFAULT     �   ALTER TABLE ONLY public.departamento ALTER COLUMN id_departamento SET DEFAULT nextval('public.departamento_id_departamento_seq'::regclass);
 K   ALTER TABLE public.departamento ALTER COLUMN id_departamento DROP DEFAULT;
       public          postgres    false    207    206    207            �
           2604    17104 "   detalle_factura id_detalle_factura    DEFAULT     �   ALTER TABLE ONLY public.detalle_factura ALTER COLUMN id_detalle_factura SET DEFAULT nextval('public.detalle_factura_id_detalle_factura_seq'::regclass);
 Q   ALTER TABLE public.detalle_factura ALTER COLUMN id_detalle_factura DROP DEFAULT;
       public          postgres    false    216    217    217            �
           2604    17047    factura id_factura    DEFAULT     x   ALTER TABLE ONLY public.factura ALTER COLUMN id_factura SET DEFAULT nextval('public.factura_id_factura_seq'::regclass);
 A   ALTER TABLE public.factura ALTER COLUMN id_factura DROP DEFAULT;
       public          postgres    false    210    211    211            �
           2604    17140    items_carrito id_itemcarrito    DEFAULT     �   ALTER TABLE ONLY public.items_carrito ALTER COLUMN id_itemcarrito SET DEFAULT nextval('public.items_carrito_id_itemcarrito_seq'::regclass);
 K   ALTER TABLE public.items_carrito ALTER COLUMN id_itemcarrito DROP DEFAULT;
       public          postgres    false    221    220    221            �
           2604    17055    marca id_marca    DEFAULT     p   ALTER TABLE ONLY public.marca ALTER COLUMN id_marca SET DEFAULT nextval('public.marca_id_marca_seq'::regclass);
 =   ALTER TABLE public.marca ALTER COLUMN id_marca DROP DEFAULT;
       public          postgres    false    213    212    213            �
           2604    17076    prenda id_prenda    DEFAULT     t   ALTER TABLE ONLY public.prenda ALTER COLUMN id_prenda SET DEFAULT nextval('public.prenda_id_prenda_seq'::regclass);
 ?   ALTER TABLE public.prenda ALTER COLUMN id_prenda DROP DEFAULT;
       public          postgres    false    215    214    215            �
           2604    17039    proveedor id_proveedor    DEFAULT     �   ALTER TABLE ONLY public.proveedor ALTER COLUMN id_proveedor SET DEFAULT nextval('public.proveedor_id_proveedor_seq'::regclass);
 E   ALTER TABLE public.proveedor ALTER COLUMN id_proveedor DROP DEFAULT;
       public          postgres    false    208    209    209            �
           2604    17023    talla id_talla    DEFAULT     p   ALTER TABLE ONLY public.talla ALTER COLUMN id_talla SET DEFAULT nextval('public.talla_id_talla_seq'::regclass);
 =   ALTER TABLE public.talla ALTER COLUMN id_talla DROP DEFAULT;
       public          postgres    false    204    205    205            �
           2604    17012    usuario id_usuario    DEFAULT     x   ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);
 A   ALTER TABLE public.usuario ALTER COLUMN id_usuario DROP DEFAULT;
       public          postgres    false    202    203    203            m          0    17119    carrito 
   TABLE DATA           T   COPY public.carrito (id_carrito, id_usuario, id_prenda, estado_carrito) FROM stdin;
    public          postgres    false    219   �c       a          0    17028    departamento 
   TABLE DATA           ?   COPY public.departamento (id_departamento, nombre) FROM stdin;
    public          postgres    false    207   �c       k          0    17101    detalle_factura 
   TABLE DATA           T   COPY public.detalle_factura (id_detalle_factura, id_factura, id_prenda) FROM stdin;
    public          postgres    false    217   �c       e          0    17044    factura 
   TABLE DATA           H   COPY public.factura (id_factura, codigo, fecha, id_cliente) FROM stdin;
    public          postgres    false    211   d       o          0    17137    items_carrito 
   TABLE DATA           X   COPY public.items_carrito (id_itemcarrito, id_carrito, id_prenda, cantidad) FROM stdin;
    public          postgres    false    221   .d       g          0    17052    marca 
   TABLE DATA           <   COPY public.marca (id_marca, nom_marca, codigo) FROM stdin;
    public          postgres    false    213   Kd       i          0    17073    prenda 
   TABLE DATA           �   COPY public.prenda (id_prenda, id_marca, id_departamento, id_talla, disponibilidad, cantidad, id_proveedor, precio_unitario) FROM stdin;
    public          postgres    false    215   �d       c          0    17036 	   proveedor 
   TABLE DATA           A   COPY public.proveedor (id_proveedor, name_proveedor) FROM stdin;
    public          postgres    false    209   �d       _          0    17020    talla 
   TABLE DATA           <   COPY public.talla (id_talla, nom_talla, codigo) FROM stdin;
    public          postgres    false    205   5e       ]          0    17009    usuario 
   TABLE DATA           r   COPY public.usuario (id_usuario, nombre, correo_electronico, "contraseña", direccion, telefono, dui) FROM stdin;
    public          postgres    false    203   �e       �           0    0    carrito_id_carrito_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.carrito_id_carrito_seq', 1, false);
          public          postgres    false    218            �           0    0     departamento_id_departamento_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.departamento_id_departamento_seq', 1, false);
          public          postgres    false    206            �           0    0 &   detalle_factura_id_detalle_factura_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.detalle_factura_id_detalle_factura_seq', 1, false);
          public          postgres    false    216            �           0    0    factura_id_factura_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.factura_id_factura_seq', 1, false);
          public          postgres    false    210            �           0    0     items_carrito_id_itemcarrito_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.items_carrito_id_itemcarrito_seq', 1, false);
          public          postgres    false    220            �           0    0    marca_id_marca_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.marca_id_marca_seq', 1, false);
          public          postgres    false    212            �           0    0    prenda_id_prenda_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.prenda_id_prenda_seq', 1, false);
          public          postgres    false    214            �           0    0    proveedor_id_proveedor_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.proveedor_id_proveedor_seq', 1, false);
          public          postgres    false    208            �           0    0    talla_id_talla_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.talla_id_talla_seq', 1, false);
          public          postgres    false    204            �           0    0    usuario_id_usuario_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 1, false);
          public          postgres    false    202            �
           2606    17124    carrito carrito_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id_carrito);
 >   ALTER TABLE ONLY public.carrito DROP CONSTRAINT carrito_pkey;
       public            postgres    false    219            �
           2606    17033    departamento departamento_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_pkey PRIMARY KEY (id_departamento);
 H   ALTER TABLE ONLY public.departamento DROP CONSTRAINT departamento_pkey;
       public            postgres    false    207            �
           2606    17106 $   detalle_factura detalle_factura_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detalle_factura_pkey PRIMARY KEY (id_detalle_factura);
 N   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT detalle_factura_pkey;
       public            postgres    false    217            �
           2606    17049    factura factura_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_pkey PRIMARY KEY (id_factura);
 >   ALTER TABLE ONLY public.factura DROP CONSTRAINT factura_pkey;
       public            postgres    false    211            �
           2606    17142     items_carrito items_carrito_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.items_carrito
    ADD CONSTRAINT items_carrito_pkey PRIMARY KEY (id_itemcarrito);
 J   ALTER TABLE ONLY public.items_carrito DROP CONSTRAINT items_carrito_pkey;
       public            postgres    false    221            �
           2606    17057    marca marca_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (id_marca);
 :   ALTER TABLE ONLY public.marca DROP CONSTRAINT marca_pkey;
       public            postgres    false    213            �
           2606    17078    prenda prenda_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.prenda
    ADD CONSTRAINT prenda_pkey PRIMARY KEY (id_prenda);
 <   ALTER TABLE ONLY public.prenda DROP CONSTRAINT prenda_pkey;
       public            postgres    false    215            �
           2606    17041    proveedor proveedor_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT proveedor_pkey PRIMARY KEY (id_proveedor);
 B   ALTER TABLE ONLY public.proveedor DROP CONSTRAINT proveedor_pkey;
       public            postgres    false    209            �
           2606    17025    talla talla_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.talla
    ADD CONSTRAINT talla_pkey PRIMARY KEY (id_talla);
 :   ALTER TABLE ONLY public.talla DROP CONSTRAINT talla_pkey;
       public            postgres    false    205            �
           2606    17017    usuario usuario_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    203            �
           2606    17130    carrito carrito_id_prenda_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_id_prenda_fkey FOREIGN KEY (id_prenda) REFERENCES public.prenda(id_prenda);
 H   ALTER TABLE ONLY public.carrito DROP CONSTRAINT carrito_id_prenda_fkey;
       public          postgres    false    215    2765    219            �
           2606    17125    carrito carrito_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);
 I   ALTER TABLE ONLY public.carrito DROP CONSTRAINT carrito_id_usuario_fkey;
       public          postgres    false    219    203    2753            �
           2606    17107 /   detalle_factura detalle_factura_id_factura_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detalle_factura_id_factura_fkey FOREIGN KEY (id_factura) REFERENCES public.factura(id_factura);
 Y   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT detalle_factura_id_factura_fkey;
       public          postgres    false    217    211    2761            �
           2606    17112 .   detalle_factura detalle_factura_id_prenda_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detalle_factura_id_prenda_fkey FOREIGN KEY (id_prenda) REFERENCES public.prenda(id_prenda);
 X   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT detalle_factura_id_prenda_fkey;
       public          postgres    false    215    217    2765            �
           2606    17143 +   items_carrito items_carrito_id_carrito_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.items_carrito
    ADD CONSTRAINT items_carrito_id_carrito_fkey FOREIGN KEY (id_carrito) REFERENCES public.carrito(id_carrito);
 U   ALTER TABLE ONLY public.items_carrito DROP CONSTRAINT items_carrito_id_carrito_fkey;
       public          postgres    false    2769    221    219            �
           2606    17148 *   items_carrito items_carrito_id_prenda_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.items_carrito
    ADD CONSTRAINT items_carrito_id_prenda_fkey FOREIGN KEY (id_prenda) REFERENCES public.prenda(id_prenda);
 T   ALTER TABLE ONLY public.items_carrito DROP CONSTRAINT items_carrito_id_prenda_fkey;
       public          postgres    false    221    2765    215            �
           2606    17084 "   prenda prenda_id_departamento_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.prenda
    ADD CONSTRAINT prenda_id_departamento_fkey FOREIGN KEY (id_departamento) REFERENCES public.departamento(id_departamento);
 L   ALTER TABLE ONLY public.prenda DROP CONSTRAINT prenda_id_departamento_fkey;
       public          postgres    false    215    207    2757            �
           2606    17079    prenda prenda_id_marca_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.prenda
    ADD CONSTRAINT prenda_id_marca_fkey FOREIGN KEY (id_marca) REFERENCES public.marca(id_marca);
 E   ALTER TABLE ONLY public.prenda DROP CONSTRAINT prenda_id_marca_fkey;
       public          postgres    false    213    215    2763            �
           2606    17094    prenda prenda_id_proveedor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.prenda
    ADD CONSTRAINT prenda_id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedor(id_proveedor);
 I   ALTER TABLE ONLY public.prenda DROP CONSTRAINT prenda_id_proveedor_fkey;
       public          postgres    false    2759    215    209            �
           2606    17089    prenda prenda_id_talla_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.prenda
    ADD CONSTRAINT prenda_id_talla_fkey FOREIGN KEY (id_talla) REFERENCES public.talla(id_talla);
 E   ALTER TABLE ONLY public.prenda DROP CONSTRAINT prenda_id_talla_fkey;
       public          postgres    false    2755    205    215            m      x������ � �      a   &   x�3����M*J�2��-�J-�2���<�1�+F��� ��r      k      x������ � �      e      x������ � �      o      x������ � �      g   e   x�-ȷ�PD���
U �Oϐ� ہB��@Ʌ3%����k
OPT������^�V�^�+4j�[x�V]z�ЩO�z�3| 1}�/Uȸ�7}ޒ���&e      i      x������ � �      c   H   x�3�(�/KMM�/Rp�2B�9q#�L�x.\�H<W.3$��9ϝ����e����24@�zq��qqq  ,�      _   E   x�ƻ�0�x������.�����"�H��A�"UK��T'�� X7��zh��K����0��!����      ]   z  x�u�;N�0E��Uxx����������$�� b7�T,!Á��T9�9�O�1�;Wѓ�������v��֛2���6�m_�&�a��2��-:+��e�
b.�J�A`�p8vM���kR���k
Tr�>�U�9���k�F'J
��b"�$Ϛ�.���/�BP)Ɩ3ހJ��[Ɖ���G}ק����r�A����a��Ql� 
����:���w^骰P��{�� n�K��I��_7e��U�^�ޙ��6{�������L��nXh�����Hc�t����އ�b`�=��)�4c�C4�@����4��W��߅�!�{�u	ZYq#�!q��h��T�~��Xu��S��F�Ǐ������=j     