const countryList = [
  {
    value: 28,
    label: 'Chile',
    abbr: 'CL',
    currency: 'Chilean Peso',
    currency_code: 'CLP',
  },
  {
    value: 30,
    label: 'Colombia',
    abbr: 'CO',
    currency: 'Colombian Peso',
    currency_code: 'COP',
  },
  {
    value: 96,
    label: 'Mexico',
    abbr: 'MX',
    currency: 'Mexican Nuevo Peso',
    currency_code: 'MXN',
  },
  {
    value: 118,
    label: 'Peru',
    abbr: 'PE',
    currency: 'Peruvian Nuevo Sol',
    currency_code: 'PEN',
  },
  {
    value: 155,
    label: 'Venezuela',
    abbr: 'VE',
    currency: 'Venezuelan Bolivar',
    currency_code: 'VEF',
  },
  {
    value: 151,
    label: 'United State Of America',
    abbr: 'US',
    currency: 'US Dollar',
    currency_code: 'USD',
  },
];
const allCountryList = [
  {
    value: 1,
    label: 'Algeria',
    abbr: 'DZ',
    currency: 'Algerian Dinar',
    currency_code: 'DZD',
  },
  {
    value: 2,
    label: 'Andorra',
    abbr: 'AD',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 3,
    label: 'Angola',
    abbr: 'AO',
    currency: 'Angolan Kwanza',
    currency_code: 'AOA',
  },
  {
    value: 4,
    label: 'Argentina',
    abbr: 'AR',
    currency: 'Argentine Peso',
    currency_code: 'ARS',
  },
  {
    value: 5,
    label: 'Armenia',
    abbr: 'AM',
    currency: 'Armenian Dram',
    currency_code: 'AMD',
  },
  {
    value: 6,
    label: 'Aruba',
    abbr: 'AW',
    currency: 'Aruban Guilder',
    currency_code: 'AWG',
  },
  {
    value: 7,
    label: 'Australia',
    abbr: 'AU',
    currency: 'Australian Dollar',
    currency_code: 'AUD',
  },
  {
    value: 8,
    label: 'Austria',
    abbr: 'AT',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 9,
    label: 'Azerbaijan',
    abbr: 'AZ',
    currency: 'Azerbaijan New Manat',
    currency_code: 'AZN',
  },
  {
    value: 10,
    label: 'Bahamas',
    abbr: 'BS',
    currency: 'Bahamian Dollar',
    currency_code: 'BSD',
  },
  {
    value: 11,
    label: 'Bahrain',
    abbr: 'BH',
    currency: 'Bahraini Dinar',
    currency_code: 'BHD',
  },
  {
    value: 12,
    label: 'Bangladesh',
    abbr: 'BD',
    currency: 'Bangladeshi Taka',
    currency_code: 'BDT',
  },
  {
    value: 13,
    label: 'Barbados',
    abbr: 'BB',
    currency: 'Barbados Dollar',
    currency_code: 'BBD',
  },
  {
    value: 14,
    label: 'Belarus',
    abbr: 'BY',
    currency: 'Belarussian Ruble',
    currency_code: 'BYR',
  },
  {
    value: 15,
    label: 'Belgium',
    abbr: 'BE',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 16,
    label: 'Belize',
    abbr: 'BZ',
    currency: 'Belize Dollar',
    currency_code: 'BZD',
  },
  {
    value: 17,
    label: 'Benin',
    abbr: 'BJ',
    currency: 'CFA Franc BCEAO',
    currency_code: 'XOF',
  },
  {
    value: 18,
    label: 'Bermuda',
    abbr: 'BM',
    currency: 'Bermudian Dollar',
    currency_code: 'BMD',
  },
  {
    value: 19,
    label: 'Bhutan',
    abbr: 'BT',
    currency: 'Bhutan Ngultrum',
    currency_code: 'BTN',
  },
  {
    value: 20,
    label: 'Bolivia',
    abbr: 'BO',
    currency: 'Boliviano',
    currency_code: 'BOB',
  },
  {
    value: 21,
    label: 'Botswana',
    abbr: 'BW',
    currency: 'Botswana Pula',
    currency_code: 'BWP',
  },
  {
    value: 22,
    label: 'Brazil',
    abbr: 'BR',
    currency: 'Brazilian Real',
    currency_code: 'BRL',
  },
  {
    value: 23,
    label: 'Bulgaria',
    abbr: 'BG',
    currency: 'Bulgarian Lev',
    currency_code: 'BGN',
  },
  {
    value: 24,
    label: 'Burundi',
    abbr: 'BI',
    currency: 'Burundi Franc',
    currency_code: 'BIF',
  },
  {
    value: 25,
    label: 'Cambodia',
    abbr: 'KH',
    currency: 'Kampuchean Riel',
    currency_code: 'KHR',
  },
  {
    value: 26,
    label: 'Cameroon',
    abbr: 'CM',
    currency: 'CFA Franc BEAC',
    currency_code: 'XAF',
  },
  {
    value: 27,
    label: 'Canada',
    abbr: 'CA',
    currency: 'Canadian Dollar',
    currency_code: 'CAD',
  },
  {
    value: 28,
    label: 'Chile',
    abbr: 'CL',
    currency: 'Chilean Peso',
    currency_code: 'CLP',
  },
  {
    value: 29,
    label: 'China',
    abbr: 'CN',
    currency: 'Yuan Renminbi',
    currency_code: 'CNY',
  },
  {
    value: 30,
    label: 'Colombia',
    abbr: 'CO',
    currency: 'Colombian Peso',
    currency_code: 'COP',
  },
  {
    value: 31,
    label: 'Comoros',
    abbr: 'KM',
    currency: 'Comoros Franc',
    currency_code: 'KMF',
  },
  {
    value: 32,
    label: 'Congo',
    abbr: 'CG',
    currency: 'CFA Franc BEAC',
    currency_code: 'XAF',
  },
  {
    value: 33,
    label: 'Croatia',
    abbr: 'HR',
    currency: 'Croatian Kuna',
    currency_code: 'HRK',
  },
  {
    value: 34,
    label: 'Cuba',
    abbr: 'CU',
    currency: 'Cuban Peso',
    currency_code: 'CUP',
  },
  {
    value: 35,
    label: 'Cyprus',
    abbr: 'CY',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 36,
    label: 'Denmark',
    abbr: 'DK',
    currency: 'Danish Krone',
    currency_code: 'DKK',
  },
  {
    value: 37,
    label: 'Djibouti',
    abbr: 'DJ',
    currency: 'Djibouti Franc',
    currency_code: 'DJF',
  },
  {
    value: 38,
    label: 'Dominica',
    abbr: 'DM',
    currency: 'East Caribbean Dollar',
    currency_code: 'XCD',
  },
  {
    value: 39,
    label: 'Dominican Republic',
    abbr: 'DO',
    currency: 'Dominican Peso',
    currency_code: 'DOP',
  },
  {
    value: 40,
    label: 'Ecuador',
    abbr: 'EC',
    currency: 'Ecuador Sucre',
    currency_code: 'ECS',
  },
  {
    value: 41,
    label: 'Egypt',
    abbr: 'EG',
    currency: 'Egyptian Pound',
    currency_code: 'EGP',
  },
  {
    value: 42,
    label: 'Eritrea',
    abbr: 'ER',
    currency: 'Eritrean Nakfa',
    currency_code: 'ERN',
  },
  {
    value: 43,
    label: 'Estonia',
    abbr: 'EE',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 44,
    label: 'Ethiopia',
    abbr: 'ET',
    currency: 'Ethiopian Birr',
    currency_code: 'ETB',
  },
  {
    value: 45,
    label: 'Europe',
    abbr: 'EU',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 46,
    label: 'Finland',
    abbr: 'FI',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 47,
    label: 'France',
    abbr: 'FR',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 48,
    label: 'Gabon',
    abbr: 'GA',
    currency: 'CFA Franc BEAC',
    currency_code: 'XAF',
  },
  {
    value: 49,
    label: 'Gambia',
    abbr: 'GM',
    currency: 'Gambian Dalasi',
    currency_code: 'GMD',
  },
  {
    value: 50,
    label: 'Georgia',
    abbr: 'GE',
    currency: 'Georgian Lari',
    currency_code: 'GEL',
  },
  {
    value: 51,
    label: 'Germany',
    abbr: 'DE',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 52,
    label: 'Ghana',
    abbr: 'GH',
    currency: 'Ghanaian Cedi',
    currency_code: 'GHS',
  },
  {
    value: 53,
    label: 'Gibraltar',
    abbr: 'GI',
    currency: 'Gibraltar Pound',
    currency_code: 'GIP',
  },
  {
    value: 54,
    label: 'Greece',
    abbr: 'GR',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 55,
    label: 'Greenland',
    abbr: 'GL',
    currency: 'Danish Krone',
    currency_code: 'DKK',
  },
  {
    value: 56,
    label: 'Grenada',
    abbr: 'GD',
    currency: 'East Carribean Dollar',
    currency_code: 'XCD',
  },
  {
    value: 57,
    label: 'Guatemala',
    abbr: 'GT',
    currency: 'Guatemalan Quetzal',
    currency_code: 'QTQ',
  },
  {
    value: 58,
    label: 'Guinea',
    abbr: 'GN',
    currency: 'Guinea Franc',
    currency_code: 'GNF',
  },
  {
    value: 59,
    label: 'Guyana',
    abbr: 'GY',
    currency: 'Guyana Dollar',
    currency_code: 'GYD',
  },
  {
    value: 60,
    label: 'Haiti',
    abbr: 'HT',
    currency: 'Haitian Gourde',
    currency_code: 'HTG',
  },
  {
    value: 61,
    label: 'Honduras',
    abbr: 'HN',
    currency: 'Honduran Lempira',
    currency_code: 'HNL',
  },
  {
    value: 62,
    label: 'Hungary',
    abbr: 'HU',
    currency: 'Hungarian Forint',
    currency_code: 'HUF',
  },
  {
    value: 63,
    label: 'Iceland',
    abbr: 'IS',
    currency: 'Iceland Krona',
    currency_code: 'ISK',
  },
  {
    value: 64,
    label: 'India',
    abbr: 'IN',
    currency: 'Indian Rupee',
    currency_code: 'INR',
  },
  {
    value: 65,
    label: 'Indonesia',
    abbr: 'ID',
    currency: 'Indonesian Rupiah',
    currency_code: 'IDR',
  },
  {
    value: 66,
    label: 'Iran',
    abbr: 'IR',
    currency: 'Iranian Rial',
    currency_code: 'IRR',
  },
  {
    value: 67,
    label: 'Iraq',
    abbr: 'IQ',
    currency: 'Iraqi Dinar',
    currency_code: 'IQD',
  },
  {
    value: 68,
    label: 'Ireland',
    abbr: 'IE',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 69,
    label: 'Israel',
    abbr: 'IL',
    currency: 'Israeli New Shekel',
    currency_code: 'ILS',
  },
  {
    value: 70,
    label: 'Italy',
    abbr: 'IT',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 71,
    label: 'Jamaica',
    abbr: 'JM',
    currency: 'Jamaican Dollar',
    currency_code: 'JMD',
  },
  {
    value: 72,
    label: 'Japan',
    abbr: 'JP',
    currency: 'Japanese Yen',
    currency_code: 'JPY',
  },
  {
    value: 73,
    label: 'Jordan',
    abbr: 'JO',
    currency: 'Jordanian Dinar',
    currency_code: 'JOD',
  },
  {
    value: 74,
    label: 'Kenya',
    abbr: 'KE',
    currency: 'Kenyan Shilling',
    currency_code: 'KES',
  },
  {
    value: 75,
    label: 'Kiribati',
    abbr: 'KI',
    currency: 'Australian Dollar',
    currency_code: 'AUD',
  },
  {
    value: 76,
    label: 'Kuwait',
    abbr: 'KW',
    currency: 'Kuwaiti Dinar',
    currency_code: 'KWD',
  },
  {
    value: 77,
    label: 'Kyrgyzstan',
    abbr: 'KG',
    currency: 'Som',
    currency_code: 'KGS',
  },
  {
    value: 78,
    label: 'Laos',
    abbr: 'LA',
    currency: 'Lao Kip',
    currency_code: 'LAK',
  },
  {
    value: 79,
    label: 'Latvia',
    abbr: 'LV',
    currency: 'Latvian Lats',
    currency_code: 'LVL',
  },
  {
    value: 80,
    label: 'Lebanon',
    abbr: 'LB',
    currency: 'Lebanese Pound',
    currency_code: 'LBP',
  },
  {
    value: 81,
    label: 'Lesotho',
    abbr: 'LS',
    currency: 'Lesotho Loti',
    currency_code: 'LSL',
  },
  {
    value: 82,
    label: 'Liberia',
    abbr: 'LR',
    currency: 'Liberian Dollar',
    currency_code: 'LRD',
  },
  {
    value: 83,
    label: 'Liechtenstein',
    abbr: 'LI',
    currency: 'Swiss Franc',
    currency_code: 'CHF',
  },
  {
    value: 84,
    label: 'Lithuania',
    abbr: 'LT',
    currency: 'Lithuanian Litas',
    currency_code: 'LTL',
  },
  {
    value: 85,
    label: 'Luxembourg',
    abbr: 'LU',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 86,
    label: 'Macedonia',
    abbr: 'MK',
    currency: 'Denar',
    currency_code: 'MKD',
  },
  {
    value: 87,
    label: 'Madagascar',
    abbr: 'MG',
    currency: 'Malagasy Franc',
    currency_code: 'MGF',
  },
  {
    value: 88,
    label: 'Malawi',
    abbr: 'MW',
    currency: 'Malawi Kwacha',
    currency_code: 'MWK',
  },
  {
    value: 89,
    label: 'Malaysia',
    abbr: 'MY',
    currency: 'Malaysian Ringgit',
    currency_code: 'MYR',
  },
  {
    value: 90,
    label: 'Maldives',
    abbr: 'MV',
    currency: 'Maldive Rufiyaa',
    currency_code: 'MVR',
  },
  {
    value: 91,
    label: 'Mali',
    abbr: 'ML',
    currency: 'CFA Franc BCEAO',
    currency_code: 'XOF',
  },
  {
    value: 92,
    label: 'Malta',
    abbr: 'MT',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 93,
    label: 'Mauritania',
    abbr: 'MR',
    currency: 'Mauritanian Ouguiya',
    currency_code: 'MRO',
  },
  {
    value: 94,
    label: 'Mauritius',
    abbr: 'MU',
    currency: 'Mauritius Rupee',
    currency_code: 'MUR',
  },
  {
    value: 95,
    label: 'Mayotte',
    abbr: 'YT',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 96,
    label: 'Mexico',
    abbr: 'MX',
    currency: 'Mexican Nuevo Peso',
    currency_code: 'MXN',
  },
  {
    value: 97,
    label: 'Moldova',
    abbr: 'MD',
    currency: 'Moldovan Leu',
    currency_code: 'MDL',
  },
  {
    value: 98,
    label: 'Monaco',
    abbr: 'MC',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 99,
    label: 'Mongolia',
    abbr: 'MN',
    currency: 'Mongolian Tugrik',
    currency_code: 'MNT',
  },
  {
    value: 100,
    label: 'Montserrat',
    abbr: 'MS',
    currency: 'East Caribbean Dollar',
    currency_code: 'XCD',
  },
  {
    value: 101,
    label: 'Morocco',
    abbr: 'MA',
    currency: 'Moroccan Dirham',
    currency_code: 'MAD',
  },
  {
    value: 102,
    label: 'Mozambique',
    abbr: 'MZ',
    currency: 'Mozambique Metical',
    currency_code: 'MZN',
  },
  {
    value: 103,
    label: 'Myanmar',
    abbr: 'MM',
    currency: 'Myanmar Kyat',
    currency_code: 'MMK',
  },
  {
    value: 104,
    label: 'Namibia',
    abbr: 'NA',
    currency: 'Namibian Dollar',
    currency_code: 'NAD',
  },
  {
    value: 105,
    label: 'Nauru',
    abbr: 'NR',
    currency: 'Australian Dollar',
    currency_code: 'AUD',
  },
  {
    value: 106,
    label: 'Nepal',
    abbr: 'NP',
    currency: 'Nepalese Rupee',
    currency_code: 'NPR',
  },
  {
    value: 107,
    label: 'Netherlands',
    abbr: 'NL',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 108,
    label: 'Nicaragua',
    abbr: 'NI',
    currency: 'Nicaraguan Cordoba Oro',
    currency_code: 'NIO',
  },
  {
    value: 109,
    label: 'Niger',
    abbr: 'NE',
    currency: 'CFA Franc BCEAO',
    currency_code: 'XOF',
  },
  {
    value: 110,
    label: 'Nigeria',
    abbr: 'NG',
    currency: 'Nigerian Naira',
    currency_code: 'NGN',
  },
  {
    value: 111,
    label: 'Niue',
    abbr: 'NU',
    currency: 'New Zealand Dollar',
    currency_code: 'NZD',
  },
  {
    value: 112,
    label: 'Norway',
    abbr: 'NO',
    currency: 'Norwegian Krone',
    currency_code: 'NOK',
  },
  {
    value: 113,
    label: 'Oman',
    abbr: 'OM',
    currency: 'Omani Rial',
    currency_code: 'OMR',
  },
  {
    value: 114,
    label: 'Pakistan',
    abbr: 'PK',
    currency: 'Pakistan Rupee',
    currency_code: 'PKR',
  },
  {
    value: 115,
    label: 'Palau',
    abbr: 'PW',
    currency: 'US Dollar',
    currency_code: 'USD',
  },
  {
    value: 116,
    label: 'Panama',
    abbr: 'PA',
    currency: 'Panamanian Balboa',
    currency_code: 'PAB',
  },
  {
    value: 117,
    label: 'Paraguay',
    abbr: 'PY',
    currency: 'Paraguay Guarani',
    currency_code: 'PYG',
  },
  {
    value: 118,
    label: 'Peru',
    abbr: 'PE',
    currency: 'Peruvian Nuevo Sol',
    currency_code: 'PEN',
  },
  {
    value: 119,
    label: 'Philippines',
    abbr: 'PH',
    currency: 'Philippine Peso',
    currency_code: 'PHP',
  },
  {
    value: 120,
    label: 'Poland',
    abbr: 'PL',
    currency: 'Polish Zloty',
    currency_code: 'PLN',
  },
  {
    value: 121,
    label: 'Portugal',
    abbr: 'PT',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 122,
    label: 'Qatar',
    abbr: 'QA',
    currency: 'Qatari Rial',
    currency_code: 'QAR',
  },
  {
    value: 123,
    label: 'Romania',
    abbr: 'RO',
    currency: 'Romanian New Leu',
    currency_code: 'RON',
  },
  {
    value: 124,
    label: 'Rwanda',
    abbr: 'RW',
    currency: 'Rwanda Franc',
    currency_code: 'RWF',
  },
  {
    value: 125,
    label: 'Samoa',
    abbr: 'WS',
    currency: 'Samoan Tala',
    currency_code: 'WST',
  },
  {
    value: 126,
    label: 'Senegal',
    abbr: 'SN',
    currency: 'CFA Franc BCEAO',
    currency_code: 'XOF',
  },
  {
    value: 127,
    label: 'Seychelles',
    abbr: 'SC',
    currency: 'Seychelles Rupee',
    currency_code: 'SCR',
  },
  {
    value: 128,
    label: 'Singapore',
    abbr: 'SG',
    currency: 'Singapore Dollar',
    currency_code: 'SGD',
  },
  {
    value: 129,
    label: 'Slovakia',
    abbr: 'SK',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 130,
    label: 'Slovenia',
    abbr: 'SI',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 131,
    label: 'Somalia',
    abbr: 'SO',
    currency: 'Somali Shilling',
    currency_code: 'SOS',
  },
  {
    value: 132,
    label: 'Spain',
    abbr: 'ES',
    currency: 'Euro',
    currency_code: 'EUR',
  },
  {
    value: 133,
    label: 'Sudan',
    abbr: 'SD',
    currency: 'Sudanese Pound',
    currency_code: 'SDG',
  },
  {
    value: 134,
    label: 'Suriname',
    abbr: 'SR',
    currency: 'Surinam Dollar',
    currency_code: 'SRD',
  },
  {
    value: 135,
    label: 'Swaziland',
    abbr: 'SZ',
    currency: 'Swaziland Lilangeni',
    currency_code: 'SZL',
  },
  {
    value: 136,
    label: 'Sweden',
    abbr: 'SE',
    currency: 'Swedish Krona',
    currency_code: 'SEK',
  },
  {
    value: 137,
    label: 'Switzerland',
    abbr: 'CH',
    currency: 'Swiss Franc',
    currency_code: 'CHF',
  },
  {
    value: 138,
    label: 'Syria',
    abbr: 'SY',
    currency: 'Syrian Pound',
    currency_code: 'SYP',
  },
  {
    value: 139,
    label: 'Tajikistan',
    abbr: 'TJ',
    currency: 'Tajik Somoni',
    currency_code: 'TJS',
  },
  {
    value: 140,
    label: 'Tanzania',
    abbr: 'TZ',
    currency: 'Tanzanian Shilling',
    currency_code: 'TZS',
  },
  {
    value: 141,
    label: 'Thailand',
    abbr: 'TH',
    currency: 'Thai Baht',
    currency_code: 'THB',
  },
  {
    value: 142,
    label: 'Togo',
    abbr: 'TG',
    currency: 'CFA Franc BCEAO',
    currency_code: 'XOF',
  },
  {
    value: 143,
    label: 'Tokelau',
    abbr: 'TK',
    currency: 'New Zealand Dollar',
    currency_code: 'NZD',
  },
  {
    value: 144,
    label: 'Tonga',
    abbr: 'TO',
    currency: "Tongan Pa'anga",
    currency_code: 'TOP',
  },
  {
    value: 145,
    label: 'Tunisia',
    abbr: 'TN',
    currency: 'Tunisian Dollar',
    currency_code: 'TND',
  },
  {
    value: 146,
    label: 'Turkey',
    abbr: 'TR',
    currency: 'Turkish Lira',
    currency_code: 'TRY',
  },
  {
    value: 147,
    label: 'Turkmenistan',
    abbr: 'TM',
    currency: 'Manat',
    currency_code: 'TMT',
  },
  {
    value: 148,
    label: 'Tuvalu',
    abbr: 'TV',
    currency: 'Australian Dollar',
    currency_code: 'AUD',
  },
  {
    value: 149,
    label: 'Uganda',
    abbr: 'UG',
    currency: 'Uganda Shilling',
    currency_code: 'UGX',
  },
  {
    value: 150,
    label: 'Ukraine',
    abbr: 'UA',
    currency: 'Ukraine Hryvnia',
    currency_code: 'UAH',
  },
  {
    value: 151,
    label: 'United State Of America',
    abbr: 'US',
    currency: 'US Dollar',
    currency_code: 'USD',
  },
  {
    value: 152,
    label: 'Uruguay',
    abbr: 'UY',
    currency: 'Uruguayan Peso',
    currency_code: 'UYU',
  },
  {
    value: 153,
    label: 'Uzbekistan',
    abbr: 'UZ',
    currency: 'Uzbekistan Sum',
    currency_code: 'UZS',
  },
  {
    value: 154,
    label: 'Vanuatu',
    abbr: 'VU',
    currency: 'Vanuatu Vatu',
    currency_code: 'VUV',
  },
  {
    value: 155,
    label: 'Venezuela',
    abbr: 'VE',
    currency: 'Venezuelan Bolivar',
    currency_code: 'VEF',
  },
  {
    value: 156,
    label: 'Vietnam',
    abbr: 'VN',
    currency: 'Vietnamese Dong',
    currency_code: 'VND',
  },
  {
    value: 157,
    label: 'Yemen',
    abbr: 'YE',
    currency: 'Yemeni Rial',
    currency_code: 'YER',
  },
  {
    value: 158,
    label: 'Zambia',
    abbr: 'ZM',
    currency: 'Zambian Kwacha',
    currency_code: 'ZMW',
  },
  {
    value: 159,
    label: 'Zimbabwe',
    abbr: 'ZW',
    currency: 'Zimbabwe Dollar',
    currency_code: 'ZWD',
  },
];

export const countryNames = countryList.map(item => {
  return {label: item.label};
});

export const searchCountries = query =>
  countryList.filter(item => {
    return item.label.search(query) > -1;
  });

function filterItems(query) {
  return countryList.filter(function (el) {
    return el.label == query;
  });
}

export const getCountryId = code => {
  let index = filterItems(code)[0];
  return index.id;
};

export default countryList;
