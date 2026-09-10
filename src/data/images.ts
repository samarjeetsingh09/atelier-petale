/**
 * Placeholder photography.
 *
 * These are the images generated alongside the Stitch design. They are here so
 * that swapping in the studio's real photography is a one-file edit: drop files
 * into /public/images and change these strings to e.g. '/images/pastel-bloom-1.jpg'.
 *
 * Every <img> in the app sits on a `surface-container-high` background, so a
 * missing or slow image degrades to a warm block rather than a white gap.
 */
const remote = (id: string) => `https://lh3.googleusercontent.com/aida-public/${id}`;

export const images = {
  daisyBouquet: remote(
    'AB6AXuDpYFvBaYqYmD0k3UKZaexKlO5XbH5Y0lMxFnTrQX0QPTvODz9MAk524Rs3uCbDSXSQw2L_8_Z_qs7D4KNU2k6S8xEtUvP02XCmtoWLFs7o1DN55xhsgcTA8TS--Ty68W5dqhe07B2H3utx-CE-mfv6-iJS1EvwnT_30-TVRf_ojFfmCrWX0AVSJ_Xu-ubWX3ahCQgtVhMQiT_h8uleI14zW-XdFRjdIeyu37iRk8ETjmLhfSpiPYTY',
  ),
  pastelBloomTissue: remote(
    'AB6AXuAgSNAIvDsJe8GpgOMz35HvtWAZO1k0XNgxN8PUatuqK7MILuJb4YeUU7ATXeESjDg2HA3PlfmRcY4Xi6eLnwrx6IXPYrKaE8FIvBKdJA6hYJejncbjoQrKGLwncPR1UwtPLp2qfgZ3aEahjBKb7Ig_vwW_MyCL5tunUK_XSHeE_Yuggb2omqHHMWFRRU-892MSHMT-J4MiAY92N5p6i84j_2seHu6Y-Mr-BvvQQWKwt_F4xj9AQA4J',
  ),
  pastelBloomKraft: remote(
    'AB6AXuAeCfPgBcrzczv-zgszgf2eAnZg6HIaIukH36CcEBhBG6MuIDHiR35vLfUCjnVd4aMAgAmTlW_fmprR6LCspkczUDjBZrps_RdnfMnOwT4dnB5P489_dVznqjlxsEoUOS2yg5mEqhocGY-2sxF6xM96Z8lWGUCXWLgwDJVetuIe-pkLwZGIr46XN_vkZGAAZlB5Jm25h4YK9yKTwNh-qQ2yOhZTn-Py6CQ2GpaPyKAWgb5_kGGbHntK',
  ),
  daisyLoveDetail: remote(
    'AB6AXuAHpgSDuDJosWUPidvD4JUeqk4UZC4g78cihpc-7SCppWqLttsjYtxdj7NvmhGIFN3nVV2d5GAEJ78IXHkQHgzCKViTPjobDY8w-7hODx7nT6mRb_d41CAdbRPMXcPS9UL1CdUkuwNOh0cs9GMiqIV2_TIx6bP0hn6OgzJIoJFg64c2WkZVSRFUwPRRbbpSNA9CP82O7XnYQa7uQLUbse-E7ZLfAVuGuNvUG8odVfD3JP06ybVhiooh',
  ),
  peonyEucalyptus: remote(
    'AB6AXuAWNdl7zteV5pgwDaC8uYgfTQGcg00N9yQ7HPNCKjNUmgvzcVnFVNRQkb9XG1q23069x51hMGWMg8ZQfTYy0ED1VvrB_SGHKhUmbPwgh2ri-E9KTSGHEpE6RLMRh3xeGMw5B4Iu02ZnrSg4dHoUuoGNJ9-1EtG0BMzh_TKEeiBlJR3NJWKB7aCb_v7lFGApjGFPNp14QQlRFXLQjMHL4dDyBFSF0alA7ugHm_S0yhdPJZRMMaD77nnx',
  ),
  lavenderHaven: remote(
    'AB6AXuCZ_QXjGvU8_SAyefSQOUdA1y8e4bC9L3XhFNLiIDEUgyFHOuk8iCZ9_sEIPdaaN6l1Ev_l1xFGW9vOElB9tNeECuZfaeLgbmoN0mjQNrlDYxwrFNfAu4LrVmqTyE55Vhjntd4RBnXpRQgYhIZkft_RzutY4laWTQOu3FQsUXt25radSVyOQ0A1rmV2ZNQhzidCCgzFY-BXpR0YZuGz8v2bcWHAnqrZR6k-naOfMqv_alDneorNBDLR',
  ),
  handsCrocheting: remote(
    'AB6AXuDTiKWSFjwrUbgEjT4yrWjjwEVPfLZZKSIj1V4x-9iDbii0yT0cDBmDwflxI-U6vTIkOBb5hdLNzmi1M9GplE_zFyaAtqLeirF2yYBN5pik3Y5m1kKpYwxDTv0uUMnAnVxIWGpRcWySuhfVyJJKOLrE7hx-7zPFfV1z44W5r-u1srDxkCU88qOQmGvB9SaHXReq6sYXqIMw-lyJ7wKQmNalAgNXePpUXiT44LsrgR10OAd0bN9DdIYe',
  ),
  founderPortrait: remote(
    'AB6AXuBhd5IIeF3kDekGtTJdI3qFs80d1Bkeh33lrAwuAQVwzfyRe8g6E5mki43c8nECRFT-fbxBXIeURaJwSrfwwwUXXhGRHgkuKBYo5vwTQGwXKQLfWPNSXEOjBbm4X-nMluMDnxBvrxkbxIA-ZYtw3yTBbQ5gM6vb1fDlP9G2HIknE1so1SuGy7ctJNw81N2_fMJWQsbrqhLTkOFRNiUtYKXVw9tse6DBuWDeYtDcUVG9a6x2PNAACbQo',
  ),
  yarnFlatlay: remote(
    'AB6AXuCXe1PIq_-PV0A97k_KxtsC4Gmbs7C2-z0XScZJOH6A_PlyHj6uurKsmfVN9KDGWgWuyCMGAua24iB90y-u8SzaCREjfDv61n0EskY2HMGvDrW4vwsv6uxtkclUKIhgyY5D9395G8SEYhtZvIsN0cj4thbntOKTRIk249u4-T_HP0IdjYR4SlYibUpkqWoUexAH4R1Mb0-bAPuCpE3j5CcN7sojNK93yHta2JJjP2u52LfkPduiFnQX',
  ),
  packagingRibbon: remote(
    'AB6AXuBukjwdIP0nLO0t7zg7oqmmXhZ8spCHU3Jq4715E6QfFb70oZxYinXIOCnsx9So0mOsDuWiYRUfCSU83ayQtGXm0mKfl_K0vBJGtdsRfcGQMlXexfPl3piHXNclXHX5QZ-DbZYOOkiuZLMySuGLMP9MtQLwaj43niVyr8zuuS3nDTdfsQNSur4Ltdfyn2FgiTnsPZ4GXHGH5QQooG2E74Y3qAocUjIFIMtUvmQoxO-46lJjGDK-gngj',
  ),
} as const;
