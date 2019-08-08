/* A Bison parser, made by GNU Bison 3.0.4.  */

/* Bison implementation for Yacc-like parsers in C

   Copyright (C) 1984, 1989-1990, 2000-2015 Free Software Foundation, Inc.

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.  */

/* As a special exception, you may create a larger work that contains
   part or all of the Bison parser skeleton and distribute that work
   under terms of your choice, so long as that work isn't itself a
   parser generator using the skeleton or a modified version thereof
   as a parser skeleton.  Alternatively, if you modify or redistribute
   the parser skeleton itself, you may (at your option) remove this
   special exception, which will cause the skeleton and the resulting
   Bison output files to be licensed under the GNU General Public
   License without this special exception.

   This special exception was added by the Free Software Foundation in
   version 2.2 of Bison.  */

/* C LALR(1) parser skeleton written by Richard Stallman, by
   simplifying the original so-called "semantic" parser.  */

/* All symbols defined below should begin with yy or YY, to avoid
   infringing on user name space.  This should be done even for local
   variables, as they might otherwise be expanded by user macros.
   There are some unavoidable exceptions within include files to
   define necessary library symbols; they are noted "INFRINGES ON
   USER NAME SPACE" below.  */

/* Identify Bison output.  */
#define YYBISON 1

/* Bison version.  */
#define YYBISON_VERSION "3.0.4"

/* Skeleton name.  */
#define YYSKELETON_NAME "yacc.c"

/* Pure parsers.  */
#define YYPURE 0

/* Push parsers.  */
#define YYPUSH 0

/* Pull parsers.  */
#define YYPULL 1




/* Copy the first part of user declarations.  */
#line 1 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:339  */

#pragma warning(disable:4786)

#include "platform.h"

#include <stdlib.h>
#include <stdio.h>
#include <ctype.h>
#include <string.h>
#include <stdarg.h>
#include <set>
#include <string>
#include "hidl_utils.hpp"

#ifdef _WIN32
    #include <io.h>
    #include <fcntl.h>
    #include <share.h>
    #include <sys\stat.h>
#endif
#include "hidlcomp.h"

//#define YYDEBUG 1

void AddEspService();
void AddModule(void);
void AddEnum(void);
void AddMetaTag(MetaTagInfo *mti);
void AddEspInclude();
MetaTagInfo* getClearCurMetaTags();
void AddApi();
void AddEspMessage();
void AddEspProperty();

extern int yylex(void);
void yyerror(const char *s);

void check_param(void);

HIDLcompiler * hcp;

ModuleInfo * CurModule=NULL;
ProcInfo *   CurProc;
ParamInfo *  CurParam;
LayoutInfo * CurLayout;
EnumInfo *   CurEnum=NULL;  
EnumValInfo *   CurEnumVal;
int EnumValue = 0;
ApiInfo * CurApi=NULL;
IncludeInfo *CurInclude=NULL;
//EspMethodInfo * CurMethod=NULL;

EspMessageInfo * CurEspMessage=NULL;
EspServInfo * CurService=NULL;
MetaTagInfo * CurMetaTags=NULL;

ModuleInfo * LastModule;
ProcInfo *   LastProc;
ParamInfo *  LastParam;
LayoutInfo * LastLayout;
EnumInfo *   LastEnum;  
EnumValInfo *   LastEnumVal;
ApiInfo * LastApi=NULL;
IncludeInfo *LastInclude=NULL;

EspMessageInfo * LastEspMessage=NULL;
EspServInfo * LastService=NULL;
//EspMethodInfo * LastMethod=NULL;

char *esp_def_export_tag=NULL;

bool rettype;
unsigned linenum=1;
unsigned errnum=0;
int  nCommentStartLine = -1;


#line 144 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:339  */

# ifndef YY_NULLPTR
#  if defined __cplusplus && 201103L <= __cplusplus
#   define YY_NULLPTR nullptr
#  else
#   define YY_NULLPTR 0
#  endif
# endif

/* Enabling verbose error messages.  */
#ifdef YYERROR_VERBOSE
# undef YYERROR_VERBOSE
# define YYERROR_VERBOSE 1
#else
# define YYERROR_VERBOSE 0
#endif

/* In a future release of Bison, this section will be replaced
   by #include "hidlgram.h".  */
#ifndef YY_YY_HOME_SATHVIK_HPCC_HPCC_PLATFORM_BUILD_TOOLS_HIDL_HIDLGRAM_H_INCLUDED
# define YY_YY_HOME_SATHVIK_HPCC_HPCC_PLATFORM_BUILD_TOOLS_HIDL_HIDLGRAM_H_INCLUDED
/* Debug traces.  */
#ifndef YYDEBUG
# define YYDEBUG 0
#endif
#if YYDEBUG
extern int yydebug;
#endif

/* Token type.  */
#ifndef YYTOKENTYPE
# define YYTOKENTYPE
  enum yytokentype
  {
    MODULE = 258,
    SCMAPI = 259,
    SCMEXPORTDEF = 260,
    SCMINTERFACE = 261,
    SCMENUM = 262,
    SCMCLARION = 263,
    SCMEND = 264,
    ESPINCLUDE = 265,
    ESPSTRUCT = 266,
    ESPENUM = 267,
    ESPSTRUCTREF = 268,
    ESPENUMREF = 269,
    ESPREQUEST = 270,
    ESPRESPONSE = 271,
    ESPSERVICE = 272,
    ESPMETHOD = 273,
    ESPMETHODREF = 274,
    ESPVERSIONDEF = 275,
    ESPTEMPLATE = 276,
    ESPMOUNT = 277,
    ESPDEFEXPORT = 278,
    XSDTYPE = 279,
    _CONST = 280,
    _VOID = 281,
    _CHAR = 282,
    _BOOL = 283,
    _BYTE = 284,
    _INT = 285,
    _UNSIGNED = 286,
    _SHORT = 287,
    _LONG = 288,
    _FLOAT = 289,
    _DOUBLE = 290,
    _IN = 291,
    _OUT = 292,
    INOUT = 293,
    STRING = 294,
    _SIZE = 295,
    SIZEBYTES = 296,
    LAYOUT = 297,
    ASYNC = 298,
    _CALLBACK = 299,
    TIMEOUT = 300,
    VIRTUAL = 301,
    STAR = 302,
    UMBERSAND = 303,
    INTEGER_CONST = 304,
    STRING_CONST = 305,
    BOOL_CONST = 306,
    DOUBLE_CONST = 307,
    ID = 308,
    CONST_ID = 309
  };
#endif

/* Value type.  */
#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
typedef int YYSTYPE;
# define YYSTYPE_IS_TRIVIAL 1
# define YYSTYPE_IS_DECLARED 1
#endif


extern YYSTYPE yylval;

int yyparse (void);

#endif /* !YY_YY_HOME_SATHVIK_HPCC_HPCC_PLATFORM_BUILD_TOOLS_HIDL_HIDLGRAM_H_INCLUDED  */

/* Copy the second part of user declarations.  */

#line 250 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:358  */

#ifdef short
# undef short
#endif

#ifdef YYTYPE_UINT8
typedef YYTYPE_UINT8 yytype_uint8;
#else
typedef unsigned char yytype_uint8;
#endif

#ifdef YYTYPE_INT8
typedef YYTYPE_INT8 yytype_int8;
#else
typedef signed char yytype_int8;
#endif

#ifdef YYTYPE_UINT16
typedef YYTYPE_UINT16 yytype_uint16;
#else
typedef unsigned short int yytype_uint16;
#endif

#ifdef YYTYPE_INT16
typedef YYTYPE_INT16 yytype_int16;
#else
typedef short int yytype_int16;
#endif

#ifndef YYSIZE_T
# ifdef __SIZE_TYPE__
#  define YYSIZE_T __SIZE_TYPE__
# elif defined size_t
#  define YYSIZE_T size_t
# elif ! defined YYSIZE_T
#  include <stddef.h> /* INFRINGES ON USER NAME SPACE */
#  define YYSIZE_T size_t
# else
#  define YYSIZE_T unsigned int
# endif
#endif

#define YYSIZE_MAXIMUM ((YYSIZE_T) -1)

#ifndef YY_
# if defined YYENABLE_NLS && YYENABLE_NLS
#  if ENABLE_NLS
#   include <libintl.h> /* INFRINGES ON USER NAME SPACE */
#   define YY_(Msgid) dgettext ("bison-runtime", Msgid)
#  endif
# endif
# ifndef YY_
#  define YY_(Msgid) Msgid
# endif
#endif

#ifndef YY_ATTRIBUTE
# if (defined __GNUC__                                               \
      && (2 < __GNUC__ || (__GNUC__ == 2 && 96 <= __GNUC_MINOR__)))  \
     || defined __SUNPRO_C && 0x5110 <= __SUNPRO_C
#  define YY_ATTRIBUTE(Spec) __attribute__(Spec)
# else
#  define YY_ATTRIBUTE(Spec) /* empty */
# endif
#endif

#ifndef YY_ATTRIBUTE_PURE
# define YY_ATTRIBUTE_PURE   YY_ATTRIBUTE ((__pure__))
#endif

#ifndef YY_ATTRIBUTE_UNUSED
# define YY_ATTRIBUTE_UNUSED YY_ATTRIBUTE ((__unused__))
#endif

#if !defined _Noreturn \
     && (!defined __STDC_VERSION__ || __STDC_VERSION__ < 201112)
# if defined _MSC_VER && 1200 <= _MSC_VER
#  define _Noreturn __declspec (noreturn)
# else
#  define _Noreturn YY_ATTRIBUTE ((__noreturn__))
# endif
#endif

/* Suppress unused-variable warnings by "using" E.  */
#if ! defined lint || defined __GNUC__
# define YYUSE(E) ((void) (E))
#else
# define YYUSE(E) /* empty */
#endif

#if defined __GNUC__ && 407 <= __GNUC__ * 100 + __GNUC_MINOR__
/* Suppress an incorrect diagnostic about yylval being uninitialized.  */
# define YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN \
    _Pragma ("GCC diagnostic push") \
    _Pragma ("GCC diagnostic ignored \"-Wuninitialized\"")\
    _Pragma ("GCC diagnostic ignored \"-Wmaybe-uninitialized\"")
# define YY_IGNORE_MAYBE_UNINITIALIZED_END \
    _Pragma ("GCC diagnostic pop")
#else
# define YY_INITIAL_VALUE(Value) Value
#endif
#ifndef YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
# define YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
# define YY_IGNORE_MAYBE_UNINITIALIZED_END
#endif
#ifndef YY_INITIAL_VALUE
# define YY_INITIAL_VALUE(Value) /* Nothing. */
#endif


#if ! defined yyoverflow || YYERROR_VERBOSE

/* The parser invokes alloca or malloc; define the necessary symbols.  */

# ifdef YYSTACK_USE_ALLOCA
#  if YYSTACK_USE_ALLOCA
#   ifdef __GNUC__
#    define YYSTACK_ALLOC __builtin_alloca
#   elif defined __BUILTIN_VA_ARG_INCR
#    include <alloca.h> /* INFRINGES ON USER NAME SPACE */
#   elif defined _AIX
#    define YYSTACK_ALLOC __alloca
#   elif defined _MSC_VER
#    include <malloc.h> /* INFRINGES ON USER NAME SPACE */
#    define alloca _alloca
#   else
#    define YYSTACK_ALLOC alloca
#    if ! defined _ALLOCA_H && ! defined EXIT_SUCCESS
#     include <stdlib.h> /* INFRINGES ON USER NAME SPACE */
      /* Use EXIT_SUCCESS as a witness for stdlib.h.  */
#     ifndef EXIT_SUCCESS
#      define EXIT_SUCCESS 0
#     endif
#    endif
#   endif
#  endif
# endif

# ifdef YYSTACK_ALLOC
   /* Pacify GCC's 'empty if-body' warning.  */
#  define YYSTACK_FREE(Ptr) do { /* empty */; } while (0)
#  ifndef YYSTACK_ALLOC_MAXIMUM
    /* The OS might guarantee only one guard page at the bottom of the stack,
       and a page size can be as small as 4096 bytes.  So we cannot safely
       invoke alloca (N) if N exceeds 4096.  Use a slightly smaller number
       to allow for a few compiler-allocated temporary stack slots.  */
#   define YYSTACK_ALLOC_MAXIMUM 4032 /* reasonable circa 2006 */
#  endif
# else
#  define YYSTACK_ALLOC YYMALLOC
#  define YYSTACK_FREE YYFREE
#  ifndef YYSTACK_ALLOC_MAXIMUM
#   define YYSTACK_ALLOC_MAXIMUM YYSIZE_MAXIMUM
#  endif
#  if (defined __cplusplus && ! defined EXIT_SUCCESS \
       && ! ((defined YYMALLOC || defined malloc) \
             && (defined YYFREE || defined free)))
#   include <stdlib.h> /* INFRINGES ON USER NAME SPACE */
#   ifndef EXIT_SUCCESS
#    define EXIT_SUCCESS 0
#   endif
#  endif
#  ifndef YYMALLOC
#   define YYMALLOC malloc
#   if ! defined malloc && ! defined EXIT_SUCCESS
void *malloc (YYSIZE_T); /* INFRINGES ON USER NAME SPACE */
#   endif
#  endif
#  ifndef YYFREE
#   define YYFREE free
#   if ! defined free && ! defined EXIT_SUCCESS
void free (void *); /* INFRINGES ON USER NAME SPACE */
#   endif
#  endif
# endif
#endif /* ! defined yyoverflow || YYERROR_VERBOSE */


#if (! defined yyoverflow \
     && (! defined __cplusplus \
         || (defined YYSTYPE_IS_TRIVIAL && YYSTYPE_IS_TRIVIAL)))

/* A type that is properly aligned for any stack member.  */
union yyalloc
{
  yytype_int16 yyss_alloc;
  YYSTYPE yyvs_alloc;
};

/* The size of the maximum gap between one aligned stack and the next.  */
# define YYSTACK_GAP_MAXIMUM (sizeof (union yyalloc) - 1)

/* The size of an array large to enough to hold all stacks, each with
   N elements.  */
# define YYSTACK_BYTES(N) \
     ((N) * (sizeof (yytype_int16) + sizeof (YYSTYPE)) \
      + YYSTACK_GAP_MAXIMUM)

# define YYCOPY_NEEDED 1

/* Relocate STACK from its old location to the new one.  The
   local variables YYSIZE and YYSTACKSIZE give the old and new number of
   elements in the stack, and YYPTR gives the new location of the
   stack.  Advance YYPTR to a properly aligned location for the next
   stack.  */
# define YYSTACK_RELOCATE(Stack_alloc, Stack)                           \
    do                                                                  \
      {                                                                 \
        YYSIZE_T yynewbytes;                                            \
        YYCOPY (&yyptr->Stack_alloc, Stack, yysize);                    \
        Stack = &yyptr->Stack_alloc;                                    \
        yynewbytes = yystacksize * sizeof (*Stack) + YYSTACK_GAP_MAXIMUM; \
        yyptr += yynewbytes / sizeof (*yyptr);                          \
      }                                                                 \
    while (0)

#endif

#if defined YYCOPY_NEEDED && YYCOPY_NEEDED
/* Copy COUNT objects from SRC to DST.  The source and destination do
   not overlap.  */
# ifndef YYCOPY
#  if defined __GNUC__ && 1 < __GNUC__
#   define YYCOPY(Dst, Src, Count) \
      __builtin_memcpy (Dst, Src, (Count) * sizeof (*(Src)))
#  else
#   define YYCOPY(Dst, Src, Count)              \
      do                                        \
        {                                       \
          YYSIZE_T yyi;                         \
          for (yyi = 0; yyi < (Count); yyi++)   \
            (Dst)[yyi] = (Src)[yyi];            \
        }                                       \
      while (0)
#  endif
# endif
#endif /* !YYCOPY_NEEDED */

/* YYFINAL -- State number of the termination state.  */
#define YYFINAL  58
/* YYLAST -- Last index in YYTABLE.  */
#define YYLAST   358

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  69
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  85
/* YYNRULES -- Number of rules.  */
#define YYNRULES  187
/* YYNSTATES -- Number of states.  */
#define YYNSTATES  362

/* YYTRANSLATE[YYX] -- Symbol number corresponding to YYX as returned
   by yylex, with out-of-bounds checking.  */
#define YYUNDEFTOK  2
#define YYMAXUTOK   309

#define YYTRANSLATE(YYX)                                                \
  ((unsigned int) (YYX) <= YYMAXUTOK ? yytranslate[YYX] : YYUNDEFTOK)

/* YYTRANSLATE[TOKEN-NUM] -- Symbol number corresponding to TOKEN-NUM
   as returned by yylex, without out-of-bounds checking.  */
static const yytype_uint8 yytranslate[] =
{
       0,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
      55,    56,     2,    68,    60,    64,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,    61,    57,
      62,    67,    63,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,    65,     2,    66,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    58,     2,    59,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     1,     2,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      15,    16,    17,    18,    19,    20,    21,    22,    23,    24,
      25,    26,    27,    28,    29,    30,    31,    32,    33,    34,
      35,    36,    37,    38,    39,    40,    41,    42,    43,    44,
      45,    46,    47,    48,    49,    50,    51,    52,    53,    54
};

#if YYDEBUG
  /* YYRLINE[YYN] -- Source line where rule number YYN was defined.  */
static const yytype_uint16 yyrline[] =
{
       0,   137,   137,   141,   142,   146,   147,   148,   149,   150,
     151,   152,   153,   154,   155,   156,   157,   158,   162,   170,
     177,   191,   253,   254,   258,   259,   263,   264,   268,   269,
     281,   305,   317,   326,   337,   346,   355,   362,   368,   372,
     376,   380,   387,   392,   397,   398,   402,   410,   419,   432,
     433,   437,   442,   447,   455,   466,   475,   485,   494,   503,
     509,   513,   518,   522,   523,   527,   554,   584,   599,   617,
     628,   639,   656,   660,   665,   670,   675,   680,   685,   690,
     694,   698,   703,   709,   713,   716,   729,   742,   743,   748,
     749,   750,   754,   755,   759,   763,   767,   771,   775,   782,
     794,   799,   809,   818,   822,   826,   827,   832,   844,   853,
     858,   869,   880,   886,   892,   901,   917,   924,   931,   938,
     950,   961,   972,   980,   981,   982,   983,   987,   988,   993,
    1013,  1021,  1030,  1035,  1039,  1040,  1044,  1045,  1046,  1047,
    1053,  1060,  1068,  1076,  1080,  1084,  1088,  1092,  1096,  1106,
    1112,  1121,  1125,  1129,  1136,  1144,  1151,  1156,  1164,  1168,
    1175,  1176,  1180,  1197,  1211,  1225,  1242,  1246,  1268,  1282,
    1305,  1317,  1329,  1333,  1347,  1361,  1365,  1416,  1424,  1432,
    1442,  1446,  1450,  1454,  1461,  1468,  1476,  1477
};
#endif

#if YYDEBUG || YYERROR_VERBOSE || 0
/* YYTNAME[SYMBOL-NUM] -- String name of the symbol SYMBOL-NUM.
   First, the terminals, then, starting at YYNTOKENS, nonterminals.  */
static const char *const yytname[] =
{
  "$end", "error", "$undefined", "MODULE", "SCMAPI", "SCMEXPORTDEF",
  "SCMINTERFACE", "SCMENUM", "SCMCLARION", "SCMEND", "ESPINCLUDE",
  "ESPSTRUCT", "ESPENUM", "ESPSTRUCTREF", "ESPENUMREF", "ESPREQUEST",
  "ESPRESPONSE", "ESPSERVICE", "ESPMETHOD", "ESPMETHODREF",
  "ESPVERSIONDEF", "ESPTEMPLATE", "ESPMOUNT", "ESPDEFEXPORT", "XSDTYPE",
  "_CONST", "_VOID", "_CHAR", "_BOOL", "_BYTE", "_INT", "_UNSIGNED",
  "_SHORT", "_LONG", "_FLOAT", "_DOUBLE", "_IN", "_OUT", "INOUT", "STRING",
  "_SIZE", "SIZEBYTES", "LAYOUT", "ASYNC", "_CALLBACK", "TIMEOUT",
  "VIRTUAL", "STAR", "UMBERSAND", "INTEGER_CONST", "STRING_CONST",
  "BOOL_CONST", "DOUBLE_CONST", "ID", "CONST_ID", "'('", "')'", "';'",
  "'{'", "'}'", "','", "':'", "'<'", "'>'", "'-'", "'['", "']'", "'='",
  "'+'", "$accept", "hidl", "SectionList", "Section", "ExportDef",
  "EspDefExport", "EspService", "EspServiceStart", "EspServiceBody",
  "EspServiceEntryList", "EspServiceEntry", "EspServiceMethod",
  "EspServiceMount", "EspStruct", "EspStructStart", "EspEnum",
  "EspEnumStart", "EnumBase", "EnumBaseType", "EnumBody", "EnumList",
  "EnumItemDef", "OptionalComma", "EnumConstValue", "EspInclude",
  "EspRequest", "EspRequestStart", "EspResponse", "EspResponseStart",
  "OptionalExtends", "EspMessageBody", "EspPropertyList", "EspPropertyDef",
  "OptEspEnumInit", "EspPropertyInit", "EspTemplateStart",
  "EspTemplateParams", "EspPropertyStart", "EspType", "EspMetaData",
  "EspMetaPropertyList", "EspMetaProperty", "Module", "ModuleStart",
  "ModuleVersion", "ModuleBody", "Enumeration", "EnumerationStart",
  "EnumerationBody", "EnumDefList", "EnumDef", "Api", "EspVersionDef",
  "ApiStart", "ProcDefList", "ProcDef", "ProcAttr", "ProcAttrList",
  "RetParam", "ParamList", "Param", "TypeModifiers", "TypeModifier",
  "Layout", "LayoutParams", "LayoutValue", "CountVal", "LayoutSizeVal",
  "StartLayout", "String", "InOut", "StartRetParam", "StartParam",
  "SizeInfo", "IntOrId", "TypeList", "Type", "StartProc", "Virtual",
  "Abstract", "ConstFunc", "Callback", "Async", "Timeout", "string_const", YY_NULLPTR
};
#endif

# ifdef YYPRINT
/* YYTOKNUM[NUM] -- (External) token number corresponding to the
   (internal) symbol number NUM (which must be that of a token).  */
static const yytype_uint16 yytoknum[] =
{
       0,   256,   257,   258,   259,   260,   261,   262,   263,   264,
     265,   266,   267,   268,   269,   270,   271,   272,   273,   274,
     275,   276,   277,   278,   279,   280,   281,   282,   283,   284,
     285,   286,   287,   288,   289,   290,   291,   292,   293,   294,
     295,   296,   297,   298,   299,   300,   301,   302,   303,   304,
     305,   306,   307,   308,   309,    40,    41,    59,   123,   125,
      44,    58,    60,    62,    45,    91,    93,    61,    43
};
# endif

#define YYPACT_NINF -312

#define yypact_value_is_default(Yystate) \
  (!!((Yystate) == (-312)))

#define YYTABLE_NINF -134

#define yytable_value_is_error(Yytable_value) \
  0

  /* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
     STATE-NUM.  */
static const yytype_int16 yypact[] =
{
     132,   -27,     9,    39,    53,    68,    77,   110,   110,   110,
     110,   110,   110,   110,   134,   151,   176,   107,  -312,  -312,
    -312,  -312,   145,  -312,  -312,   144,  -312,   147,  -312,  -312,
     144,  -312,   144,  -312,   152,  -312,   153,  -312,  -312,   148,
    -312,   148,  -312,    52,   156,  -312,  -312,   157,    12,   159,
     160,   161,   162,   163,   164,   165,   166,   167,  -312,  -312,
       0,   168,   169,   170,    56,   171,   170,   170,    30,   172,
     173,   174,  -312,  -312,   177,  -312,   148,  -312,  -312,  -312,
    -312,  -312,  -312,   178,  -312,   179,   180,   182,  -312,   125,
    -312,  -312,  -312,  -312,  -312,  -312,   183,   184,   181,   186,
     110,  -312,     2,  -312,  -312,  -312,  -312,  -312,    -2,   187,
    -312,  -312,  -312,  -312,  -312,    31,   188,   189,   190,   192,
     193,   191,   194,   154,   -12,  -312,  -312,    92,  -312,   185,
     129,  -312,   197,  -312,   196,   198,    79,   201,   158,   203,
     204,   175,   202,   205,  -312,  -312,  -312,    50,  -312,   212,
      25,  -312,  -312,   206,  -312,   200,  -312,  -312,  -312,  -312,
    -312,  -312,  -312,   207,  -312,  -312,   -10,  -312,   173,  -312,
    -312,   208,   121,  -312,  -312,  -312,  -312,   209,   210,   214,
       3,   129,  -312,  -312,  -312,  -312,   121,  -312,  -312,   211,
    -312,   215,   216,    -7,  -312,  -312,   213,   217,   218,  -312,
     220,  -312,  -312,   219,   221,    32,   146,   225,   223,  -312,
    -312,  -312,   230,  -312,    92,   122,  -312,   129,    92,    92,
    -312,  -312,  -312,  -312,  -312,  -312,  -312,  -312,  -312,  -312,
    -312,  -312,  -312,  -312,  -312,  -312,     3,  -312,  -312,   127,
    -312,  -312,  -312,  -312,  -312,   227,   231,   226,   235,    62,
     108,   229,   234,   236,     3,  -312,  -312,   128,   238,  -312,
    -312,  -312,   237,   233,   121,   239,   240,   130,  -312,   244,
      13,  -312,   245,   241,   242,  -312,    90,  -312,  -312,   137,
     246,     3,   247,   248,   249,  -312,   150,   106,  -312,   253,
     254,     3,  -312,   235,  -312,  -312,  -312,  -312,  -312,  -312,
    -312,    92,  -312,  -312,   243,   251,  -312,   195,   252,   255,
     256,   257,   258,   141,     3,  -312,  -312,  -312,   259,   260,
    -312,   261,   262,   123,  -312,  -312,  -312,  -312,   265,   263,
    -312,  -312,  -312,   264,   221,   266,   268,  -312,  -312,  -312,
      43,   267,  -312,  -312,  -312,   269,   271,   270,   272,   274,
     124,  -312,   221,  -312,   273,  -312,  -312,  -312,   275,   277,
    -312,  -312
};

  /* YYDEFACT[STATE-NUM] -- Default reduction number in state STATE-NUM.
     Performed when YYTABLE does not specify something else to do.  Zero
     means the default is an error.  */
static const yytype_uint8 yydefact[] =
{
     177,     0,   117,     0,     0,     0,     0,    91,    91,    91,
      91,    91,    91,    91,     0,     0,     0,   177,     3,     7,
       8,    14,     0,    15,    10,    60,    11,    37,    17,    12,
      60,    13,    60,     5,   104,     6,     0,     9,    16,   128,
      30,   128,   100,     0,     0,   101,   108,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     1,     4,
     177,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,   184,   183,     0,   178,   128,   155,   123,   124,
     125,   126,   155,     0,   118,     0,     0,    98,    90,    50,
      92,    33,    35,    56,    58,    21,     0,     0,     0,     0,
      91,    23,   177,    24,    26,    27,    20,    59,    91,     0,
      38,    39,    41,    40,    36,     0,     0,     0,     0,     0,
       0,   177,     0,   114,     0,   110,   107,     0,   127,     0,
     135,   154,     0,   119,     0,     0,     0,    49,     0,     0,
       0,     0,     0,     0,    22,    25,    62,    91,    63,     0,
     155,    86,    32,    48,    43,    50,    44,    34,    55,    57,
     102,   103,   106,   177,   120,    99,     0,   109,     0,   158,
     159,     0,   155,   151,   152,   153,   150,     0,     0,     0,
       0,   135,   139,   137,   136,   138,   155,    18,    54,     0,
     186,     0,     0,     0,    93,    89,     0,     0,     0,    19,
       0,    61,    64,     0,    82,   135,     0,    49,     0,   105,
     121,   112,     0,   111,     0,     0,   130,   135,     0,     0,
     149,   175,   172,   166,   162,   164,   163,   167,   168,   165,
     169,   174,   173,   170,   171,   176,   129,   160,   134,     0,
      94,    96,    97,   187,    95,     0,     0,     0,     0,   135,
       0,     0,     0,     0,     0,    51,    52,     0,    53,    45,
      42,   113,     0,     0,   155,     0,     0,     0,   141,   145,
       0,   161,   182,     0,     0,   116,     0,    87,    88,     0,
       0,    85,     0,     0,     0,    81,     0,     0,    71,     0,
       0,   132,    46,     0,   185,   115,   131,   156,   157,   140,
     149,     0,   143,   146,     0,     0,   181,   180,     0,     0,
       0,     0,     0,     0,    84,    75,    79,    77,     0,     0,
      80,     0,    74,     0,   142,   144,   148,   147,     0,     0,
      28,    29,    31,     0,    82,     0,     0,    76,    78,    69,
       0,     0,    47,   179,   122,     0,     0,     0,     0,     0,
       0,    70,    82,    65,     0,    67,    72,    73,     0,     0,
      66,    68
};

  /* YYPGOTO[NTERM-NUM].  */
static const yytype_int16 yypgoto[] =
{
    -312,  -312,  -312,   284,  -312,  -312,  -312,  -312,  -312,  -312,
     250,   -47,  -312,  -312,  -312,  -312,  -312,  -312,  -312,  -312,
    -312,    16,    88,  -312,  -312,  -312,  -312,  -312,  -312,   131,
      87,  -312,   116,  -312,  -311,  -312,  -312,  -312,  -312,    -4,
    -312,   199,  -312,  -312,  -312,  -312,  -312,  -312,  -312,  -312,
     126,  -312,  -312,  -312,  -312,  -105,  -312,   -16,   276,   139,
    -148,  -129,  -312,  -312,  -312,     8,  -312,  -312,  -312,  -312,
    -312,  -312,   -65,  -312,  -204,  -214,  -225,  -312,  -312,  -312,
    -312,  -312,  -312,  -312,  -206
};

  /* YYDEFGOTO[NTERM-NUM].  */
static const yytype_int16 yydefgoto[] =
{
      -1,    16,    17,    18,    19,    20,    21,    22,    61,   102,
     103,    23,   105,    24,    25,    26,    27,    65,   114,   116,
     155,   156,   138,   257,    28,    29,    30,    31,    32,    63,
     109,   147,   148,   341,   251,   149,   279,   150,   280,   151,
      89,    90,    33,    34,    69,   122,    35,    36,    71,   124,
     125,    37,    38,    39,   163,    40,    76,    77,   129,   215,
     216,   254,   181,   182,   267,   268,   302,   269,   270,   183,
     184,   130,   217,   185,   171,   236,   237,    41,    78,   329,
     307,    79,    80,    81,   193
};

  /* YYTABLE[YYPACT[STATE-NUM]] -- What to do in state STATE-NUM.  If
     positive, shift that token.  If negative, reduce the rule whose
     number is the opposite.  If YYTABLE_NINF, syntax error.  */
static const yytype_int16 yytable[] =
{
     258,   180,   204,    49,    50,    51,    52,    53,    54,    55,
     262,   271,   131,   104,   265,   266,   164,   131,    12,    13,
      12,    13,   100,   346,   100,    82,    42,   221,   222,   223,
     224,   225,   226,   227,   228,   229,   230,   231,   232,   211,
     291,   358,   276,   243,   287,   252,   253,   167,   168,   244,
     233,   234,   238,   -83,   212,   104,   235,   146,   210,   101,
     128,   144,   303,    48,    43,    87,   271,   314,   173,   174,
     175,   176,   177,   178,   179,   277,   278,   304,    88,   119,
    -133,   305,  -133,   120,   153,   205,   110,   323,   111,   271,
     154,   112,   349,   190,    44,   113,   143,   325,   173,   174,
     175,   176,   177,   178,   179,    83,    45,    -2,    84,   201,
       1,     2,     3,     4,     5,    48,   296,     6,     7,     8,
     281,    46,     9,    10,    11,    12,    13,    14,   189,   190,
      15,   191,    47,   192,   350,     1,     2,     3,     4,     5,
     243,   169,     6,     7,     8,   170,   310,     9,    10,    11,
      12,    13,    14,   117,   118,    15,   243,   282,   190,   283,
     284,    66,   320,    67,   285,   173,   174,   175,   176,   177,
     178,   179,   286,   243,   243,    48,    58,  -133,   263,   342,
     357,  -133,   264,   272,   292,   137,   299,   264,   293,    56,
     300,    72,    73,    74,    75,   255,   190,   311,   256,   318,
     312,   335,   319,    60,   336,    62,    57,    68,    64,    85,
      86,    70,    91,    92,    93,    94,    95,    96,    97,    98,
      99,   166,   107,   259,   195,   106,   123,   198,   108,   115,
     121,   126,   127,   203,   133,   134,   135,   136,   139,   140,
     172,   141,   142,   208,   152,   157,   158,   159,   160,   161,
     162,   165,   186,   187,    87,   188,   196,   197,   200,   199,
     207,   206,   328,   202,   218,   219,   209,   240,   214,   220,
     306,   241,   242,   245,   247,   248,   250,   246,   153,   261,
     273,   249,   260,   275,   274,   190,   288,   289,   243,   290,
     295,   301,   326,   294,   213,   297,   298,   308,   309,   313,
     327,    59,     0,   315,   316,   317,   321,   322,   324,   330,
     333,   334,   331,   332,   343,   337,   338,   340,   339,   347,
     344,   348,   352,     0,   351,   239,   359,   345,   353,   355,
     356,     0,   360,   354,   361,     0,   194,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,   145,     0,     0,     0,     0,     0,   132
};

static const yytype_int16 yycheck[] =
{
     206,   130,   150,     7,     8,     9,    10,    11,    12,    13,
     214,   236,    77,    60,   218,   219,   121,    82,    18,    19,
      18,    19,    22,   334,    22,    41,    53,    24,    25,    26,
      27,    28,    29,    30,    31,    32,    33,    34,    35,    49,
     254,   352,   248,    50,   250,    13,    14,    59,    60,    56,
      47,    48,   181,    21,    64,   102,    53,    59,   163,    59,
      76,    59,    49,    65,    55,    53,   291,   281,    36,    37,
      38,    39,    40,    41,    42,    13,    14,    64,    66,    49,
      55,    68,    57,    53,    53,   150,    30,   293,    32,   314,
      59,    35,    49,    50,    55,    39,   100,   301,    36,    37,
      38,    39,    40,    41,    42,    53,    53,     0,    56,    59,
       3,     4,     5,     6,     7,    65,   264,    10,    11,    12,
     249,    53,    15,    16,    17,    18,    19,    20,    49,    50,
      23,    52,    55,    54,   340,     3,     4,     5,     6,     7,
      50,    49,    10,    11,    12,    53,    56,    15,    16,    17,
      18,    19,    20,    66,    67,    23,    50,    49,    50,    51,
      52,    30,    56,    32,    56,    36,    37,    38,    39,    40,
      41,    42,    64,    50,    50,    65,     0,    56,    56,    56,
      56,    60,    60,    56,    56,    60,    56,    60,    60,    55,
      60,    43,    44,    45,    46,    49,    50,    60,    52,    49,
      63,    60,    52,    58,    63,    61,    55,    55,    61,    53,
      53,    58,    53,    53,    53,    53,    53,    53,    53,    53,
      53,    67,    53,   207,    66,    57,    53,    52,    58,    58,
      58,    57,    55,    21,    56,    56,    56,    55,    55,    55,
      55,    60,    56,   155,    57,    57,    57,    57,    56,    56,
      59,    57,    55,    57,    53,    57,    53,    53,    53,    57,
      60,    55,    67,   147,    55,    55,    59,    56,    60,    55,
      25,    56,    56,    60,    56,    55,    55,    60,    53,    49,
      53,    62,    59,    57,    53,    50,    57,    53,    50,    53,
      57,    47,    49,    56,   168,    56,    56,    56,    56,    53,
      49,    17,    -1,    56,    56,    56,    53,    53,   300,    57,
      53,    53,    57,    57,    49,    56,    56,    55,    57,    53,
      57,    53,    53,    -1,    57,   186,    53,    63,    57,    57,
      56,    -1,    57,    63,    57,    -1,   137,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,   102,    -1,    -1,    -1,    -1,    -1,    82
};

  /* YYSTOS[STATE-NUM] -- The (internal number of the) accessing
     symbol of state STATE-NUM.  */
static const yytype_uint8 yystos[] =
{
       0,     3,     4,     5,     6,     7,    10,    11,    12,    15,
      16,    17,    18,    19,    20,    23,    70,    71,    72,    73,
      74,    75,    76,    80,    82,    83,    84,    85,    93,    94,
      95,    96,    97,   111,   112,   115,   116,   120,   121,   122,
     124,   146,    53,    55,    55,    53,    53,    55,    65,   108,
     108,   108,   108,   108,   108,   108,    55,    55,     0,    72,
      58,    77,    61,    98,    61,    86,    98,    98,    55,   113,
      58,   117,    43,    44,    45,    46,   125,   126,   147,   150,
     151,   152,   126,    53,    56,    53,    53,    53,    66,   109,
     110,    53,    53,    53,    53,    53,    53,    53,    53,    53,
      22,    59,    78,    79,    80,    81,    57,    53,    58,    99,
      30,    32,    35,    39,    87,    58,    88,    99,    99,    49,
      53,    58,   114,    53,   118,   119,    57,    55,   126,   127,
     140,   141,   127,    56,    56,    56,    55,    60,    91,    55,
      55,    60,    56,   108,    59,    79,    59,   100,   101,   104,
     106,   108,    57,    53,    59,    89,    90,    57,    57,    57,
      56,    56,    59,   123,   124,    57,    67,    59,    60,    49,
      53,   143,    55,    36,    37,    38,    39,    40,    41,    42,
     130,   131,   132,   138,   139,   142,    55,    57,    57,    49,
      50,    52,    54,   153,   110,    66,    53,    53,    52,    57,
      53,    59,   101,    21,   129,   141,    55,    60,    91,    59,
     124,    49,    64,   119,    60,   128,   129,   141,    55,    55,
      55,    24,    25,    26,    27,    28,    29,    30,    31,    32,
      33,    34,    35,    47,    48,    53,   144,   145,   130,   128,
      56,    56,    56,    50,    56,    60,    60,    56,    55,    62,
      55,   103,    13,    14,   130,    49,    52,    92,   153,    90,
      59,    49,   143,    56,    60,   143,   143,   133,   134,   136,
     137,   145,    56,    53,    53,    57,   153,    13,    14,   105,
     107,   130,    49,    51,    52,    56,    64,   153,    57,    53,
      53,   144,    56,    60,    56,    57,   129,    56,    56,    56,
      60,    47,   135,    49,    64,    68,    25,   149,    56,    56,
      56,    60,    63,    53,   144,    56,    56,    56,    49,    52,
      56,    53,    53,   153,   134,   143,    49,    49,    67,   148,
      57,    57,    57,    53,    53,    60,    63,    56,    56,    57,
      55,   102,    56,    49,    57,    63,   103,    53,    53,    49,
     153,    57,    53,    57,    63,    57,    56,    56,   103,    53,
      57,    57
};

  /* YYR1[YYN] -- Symbol number of symbol that rule YYN derives.  */
static const yytype_uint8 yyr1[] =
{
       0,    69,    70,    71,    71,    72,    72,    72,    72,    72,
      72,    72,    72,    72,    72,    72,    72,    72,    73,    74,
      75,    76,    77,    77,    78,    78,    79,    79,    80,    80,
      80,    81,    82,    83,    84,    85,    86,    86,    87,    87,
      87,    87,    88,    88,    89,    89,    90,    90,    90,    91,
      91,    92,    92,    92,    93,    94,    95,    96,    97,    98,
      98,    99,    99,   100,   100,   101,   101,   101,   101,   101,
     101,   101,   102,   102,   102,   103,   103,   103,   103,   103,
     103,   103,   103,   104,   105,   105,   106,   107,   107,   108,
     108,   108,   109,   109,   110,   110,   110,   110,   110,   111,
     112,   112,   113,   113,   113,   114,   114,   115,   116,   117,
     118,   118,   119,   119,   119,   120,   121,   122,   122,   122,
     123,   123,   124,   125,   125,   125,   125,   126,   126,   127,
     128,   128,   129,   129,   130,   130,   131,   131,   131,   131,
     132,   133,   133,   134,   135,   135,   136,   136,   136,   137,
     138,   139,   139,   139,   140,   141,   142,   142,   143,   143,
     144,   144,   145,   145,   145,   145,   145,   145,   145,   145,
     145,   145,   145,   145,   145,   145,   145,   146,   147,   148,
     148,   149,   149,   150,   151,   152,   153,   153
};

  /* YYR2[YYN] -- Number of symbols on the right hand side of rule YYN.  */
static const yytype_uint8 yyr2[] =
{
       0,     2,     1,     1,     2,     1,     1,     1,     1,     1,
       1,     1,     1,     1,     1,     1,     1,     1,     5,     5,
       3,     3,     3,     2,     1,     2,     1,     1,     9,     9,
       1,     7,     4,     3,     4,     3,     2,     0,     1,     1,
       1,     1,     4,     2,     1,     3,     4,     6,     1,     1,
       0,     1,     1,     1,     5,     4,     3,     4,     3,     2,
       0,     3,     2,     1,     2,     8,    10,     8,    10,     6,
       7,     4,     3,     3,     0,     3,     4,     3,     4,     3,
       3,     2,     0,     2,     2,     1,     1,     1,     1,     4,
       2,     0,     1,     3,     4,     4,     4,     4,     1,     4,
       2,     2,     3,     3,     0,     3,     2,     3,     2,     3,
       1,     3,     3,     4,     1,     7,     7,     1,     3,     4,
       1,     2,     9,     1,     1,     1,     1,     2,     0,     3,
       1,     3,     3,     0,     2,     0,     1,     1,     1,     1,
       4,     1,     3,     2,     2,     0,     2,     3,     3,     0,
       1,     1,     1,     1,     1,     0,     4,     4,     1,     1,
       1,     2,     1,     1,     1,     1,     1,     1,     1,     1,
       1,     1,     1,     1,     1,     1,     1,     0,     1,     2,
       0,     1,     0,     1,     1,     6,     1,     2
};


#define yyerrok         (yyerrstatus = 0)
#define yyclearin       (yychar = YYEMPTY)
#define YYEMPTY         (-2)
#define YYEOF           0

#define YYACCEPT        goto yyacceptlab
#define YYABORT         goto yyabortlab
#define YYERROR         goto yyerrorlab


#define YYRECOVERING()  (!!yyerrstatus)

#define YYBACKUP(Token, Value)                                  \
do                                                              \
  if (yychar == YYEMPTY)                                        \
    {                                                           \
      yychar = (Token);                                         \
      yylval = (Value);                                         \
      YYPOPSTACK (yylen);                                       \
      yystate = *yyssp;                                         \
      goto yybackup;                                            \
    }                                                           \
  else                                                          \
    {                                                           \
      yyerror (YY_("syntax error: cannot back up")); \
      YYERROR;                                                  \
    }                                                           \
while (0)

/* Error token number */
#define YYTERROR        1
#define YYERRCODE       256



/* Enable debugging if requested.  */
#if YYDEBUG

# ifndef YYFPRINTF
#  include <stdio.h> /* INFRINGES ON USER NAME SPACE */
#  define YYFPRINTF fprintf
# endif

# define YYDPRINTF(Args)                        \
do {                                            \
  if (yydebug)                                  \
    YYFPRINTF Args;                             \
} while (0)

/* This macro is provided for backward compatibility. */
#ifndef YY_LOCATION_PRINT
# define YY_LOCATION_PRINT(File, Loc) ((void) 0)
#endif


# define YY_SYMBOL_PRINT(Title, Type, Value, Location)                    \
do {                                                                      \
  if (yydebug)                                                            \
    {                                                                     \
      YYFPRINTF (stderr, "%s ", Title);                                   \
      yy_symbol_print (stderr,                                            \
                  Type, Value); \
      YYFPRINTF (stderr, "\n");                                           \
    }                                                                     \
} while (0)


/*----------------------------------------.
| Print this symbol's value on YYOUTPUT.  |
`----------------------------------------*/

static void
yy_symbol_value_print (FILE *yyoutput, int yytype, YYSTYPE const * const yyvaluep)
{
  FILE *yyo = yyoutput;
  YYUSE (yyo);
  if (!yyvaluep)
    return;
# ifdef YYPRINT
  if (yytype < YYNTOKENS)
    YYPRINT (yyoutput, yytoknum[yytype], *yyvaluep);
# endif
  YYUSE (yytype);
}


/*--------------------------------.
| Print this symbol on YYOUTPUT.  |
`--------------------------------*/

static void
yy_symbol_print (FILE *yyoutput, int yytype, YYSTYPE const * const yyvaluep)
{
  YYFPRINTF (yyoutput, "%s %s (",
             yytype < YYNTOKENS ? "token" : "nterm", yytname[yytype]);

  yy_symbol_value_print (yyoutput, yytype, yyvaluep);
  YYFPRINTF (yyoutput, ")");
}

/*------------------------------------------------------------------.
| yy_stack_print -- Print the state stack from its BOTTOM up to its |
| TOP (included).                                                   |
`------------------------------------------------------------------*/

static void
yy_stack_print (yytype_int16 *yybottom, yytype_int16 *yytop)
{
  YYFPRINTF (stderr, "Stack now");
  for (; yybottom <= yytop; yybottom++)
    {
      int yybot = *yybottom;
      YYFPRINTF (stderr, " %d", yybot);
    }
  YYFPRINTF (stderr, "\n");
}

# define YY_STACK_PRINT(Bottom, Top)                            \
do {                                                            \
  if (yydebug)                                                  \
    yy_stack_print ((Bottom), (Top));                           \
} while (0)


/*------------------------------------------------.
| Report that the YYRULE is going to be reduced.  |
`------------------------------------------------*/

static void
yy_reduce_print (yytype_int16 *yyssp, YYSTYPE *yyvsp, int yyrule)
{
  unsigned long int yylno = yyrline[yyrule];
  int yynrhs = yyr2[yyrule];
  int yyi;
  YYFPRINTF (stderr, "Reducing stack by rule %d (line %lu):\n",
             yyrule - 1, yylno);
  /* The symbols being reduced.  */
  for (yyi = 0; yyi < yynrhs; yyi++)
    {
      YYFPRINTF (stderr, "   $%d = ", yyi + 1);
      yy_symbol_print (stderr,
                       yystos[yyssp[yyi + 1 - yynrhs]],
                       &(yyvsp[(yyi + 1) - (yynrhs)])
                                              );
      YYFPRINTF (stderr, "\n");
    }
}

# define YY_REDUCE_PRINT(Rule)          \
do {                                    \
  if (yydebug)                          \
    yy_reduce_print (yyssp, yyvsp, Rule); \
} while (0)

/* Nonzero means print parse trace.  It is left uninitialized so that
   multiple parsers can coexist.  */
int yydebug;
#else /* !YYDEBUG */
# define YYDPRINTF(Args)
# define YY_SYMBOL_PRINT(Title, Type, Value, Location)
# define YY_STACK_PRINT(Bottom, Top)
# define YY_REDUCE_PRINT(Rule)
#endif /* !YYDEBUG */


/* YYINITDEPTH -- initial size of the parser's stacks.  */
#ifndef YYINITDEPTH
# define YYINITDEPTH 200
#endif

/* YYMAXDEPTH -- maximum size the stacks can grow to (effective only
   if the built-in stack extension method is used).

   Do not make this value too large; the results are undefined if
   YYSTACK_ALLOC_MAXIMUM < YYSTACK_BYTES (YYMAXDEPTH)
   evaluated with infinite-precision integer arithmetic.  */

#ifndef YYMAXDEPTH
# define YYMAXDEPTH 10000
#endif


#if YYERROR_VERBOSE

# ifndef yystrlen
#  if defined __GLIBC__ && defined _STRING_H
#   define yystrlen strlen
#  else
/* Return the length of YYSTR.  */
static YYSIZE_T
yystrlen (const char *yystr)
{
  YYSIZE_T yylen;
  for (yylen = 0; yystr[yylen]; yylen++)
    continue;
  return yylen;
}
#  endif
# endif

# ifndef yystpcpy
#  if defined __GLIBC__ && defined _STRING_H && defined _GNU_SOURCE
#   define yystpcpy stpcpy
#  else
/* Copy YYSRC to YYDEST, returning the address of the terminating '\0' in
   YYDEST.  */
static char *
yystpcpy (char *yydest, const char *yysrc)
{
  char *yyd = yydest;
  const char *yys = yysrc;

  while ((*yyd++ = *yys++) != '\0')
    continue;

  return yyd - 1;
}
#  endif
# endif

# ifndef yytnamerr
/* Copy to YYRES the contents of YYSTR after stripping away unnecessary
   quotes and backslashes, so that it's suitable for yyerror.  The
   heuristic is that double-quoting is unnecessary unless the string
   contains an apostrophe, a comma, or backslash (other than
   backslash-backslash).  YYSTR is taken from yytname.  If YYRES is
   null, do not copy; instead, return the length of what the result
   would have been.  */
static YYSIZE_T
yytnamerr (char *yyres, const char *yystr)
{
  if (*yystr == '"')
    {
      YYSIZE_T yyn = 0;
      char const *yyp = yystr;

      for (;;)
        switch (*++yyp)
          {
          case '\'':
          case ',':
            goto do_not_strip_quotes;

          case '\\':
            if (*++yyp != '\\')
              goto do_not_strip_quotes;
            /* Fall through.  */
          default:
            if (yyres)
              yyres[yyn] = *yyp;
            yyn++;
            break;

          case '"':
            if (yyres)
              yyres[yyn] = '\0';
            return yyn;
          }
    do_not_strip_quotes: ;
    }

  if (! yyres)
    return yystrlen (yystr);

  return yystpcpy (yyres, yystr) - yyres;
}
# endif

/* Copy into *YYMSG, which is of size *YYMSG_ALLOC, an error message
   about the unexpected token YYTOKEN for the state stack whose top is
   YYSSP.

   Return 0 if *YYMSG was successfully written.  Return 1 if *YYMSG is
   not large enough to hold the message.  In that case, also set
   *YYMSG_ALLOC to the required number of bytes.  Return 2 if the
   required number of bytes is too large to store.  */
static int
yysyntax_error (YYSIZE_T *yymsg_alloc, char **yymsg,
                yytype_int16 *yyssp, int yytoken)
{
  YYSIZE_T yysize0 = yytnamerr (YY_NULLPTR, yytname[yytoken]);
  YYSIZE_T yysize = yysize0;
  enum { YYERROR_VERBOSE_ARGS_MAXIMUM = 5 };
  /* Internationalized format string. */
  const char *yyformat = YY_NULLPTR;
  /* Arguments of yyformat. */
  char const *yyarg[YYERROR_VERBOSE_ARGS_MAXIMUM];
  /* Number of reported tokens (one for the "unexpected", one per
     "expected"). */
  int yycount = 0;

  /* There are many possibilities here to consider:
     - If this state is a consistent state with a default action, then
       the only way this function was invoked is if the default action
       is an error action.  In that case, don't check for expected
       tokens because there are none.
     - The only way there can be no lookahead present (in yychar) is if
       this state is a consistent state with a default action.  Thus,
       detecting the absence of a lookahead is sufficient to determine
       that there is no unexpected or expected token to report.  In that
       case, just report a simple "syntax error".
     - Don't assume there isn't a lookahead just because this state is a
       consistent state with a default action.  There might have been a
       previous inconsistent state, consistent state with a non-default
       action, or user semantic action that manipulated yychar.
     - Of course, the expected token list depends on states to have
       correct lookahead information, and it depends on the parser not
       to perform extra reductions after fetching a lookahead from the
       scanner and before detecting a syntax error.  Thus, state merging
       (from LALR or IELR) and default reductions corrupt the expected
       token list.  However, the list is correct for canonical LR with
       one exception: it will still contain any token that will not be
       accepted due to an error action in a later state.
  */
  if (yytoken != YYEMPTY)
    {
      int yyn = yypact[*yyssp];
      yyarg[yycount++] = yytname[yytoken];
      if (!yypact_value_is_default (yyn))
        {
          /* Start YYX at -YYN if negative to avoid negative indexes in
             YYCHECK.  In other words, skip the first -YYN actions for
             this state because they are default actions.  */
          int yyxbegin = yyn < 0 ? -yyn : 0;
          /* Stay within bounds of both yycheck and yytname.  */
          int yychecklim = YYLAST - yyn + 1;
          int yyxend = yychecklim < YYNTOKENS ? yychecklim : YYNTOKENS;
          int yyx;

          for (yyx = yyxbegin; yyx < yyxend; ++yyx)
            if (yycheck[yyx + yyn] == yyx && yyx != YYTERROR
                && !yytable_value_is_error (yytable[yyx + yyn]))
              {
                if (yycount == YYERROR_VERBOSE_ARGS_MAXIMUM)
                  {
                    yycount = 1;
                    yysize = yysize0;
                    break;
                  }
                yyarg[yycount++] = yytname[yyx];
                {
                  YYSIZE_T yysize1 = yysize + yytnamerr (YY_NULLPTR, yytname[yyx]);
                  if (! (yysize <= yysize1
                         && yysize1 <= YYSTACK_ALLOC_MAXIMUM))
                    return 2;
                  yysize = yysize1;
                }
              }
        }
    }

  switch (yycount)
    {
# define YYCASE_(N, S)                      \
      case N:                               \
        yyformat = S;                       \
      break
      YYCASE_(0, YY_("syntax error"));
      YYCASE_(1, YY_("syntax error, unexpected %s"));
      YYCASE_(2, YY_("syntax error, unexpected %s, expecting %s"));
      YYCASE_(3, YY_("syntax error, unexpected %s, expecting %s or %s"));
      YYCASE_(4, YY_("syntax error, unexpected %s, expecting %s or %s or %s"));
      YYCASE_(5, YY_("syntax error, unexpected %s, expecting %s or %s or %s or %s"));
# undef YYCASE_
    }

  {
    YYSIZE_T yysize1 = yysize + yystrlen (yyformat);
    if (! (yysize <= yysize1 && yysize1 <= YYSTACK_ALLOC_MAXIMUM))
      return 2;
    yysize = yysize1;
  }

  if (*yymsg_alloc < yysize)
    {
      *yymsg_alloc = 2 * yysize;
      if (! (yysize <= *yymsg_alloc
             && *yymsg_alloc <= YYSTACK_ALLOC_MAXIMUM))
        *yymsg_alloc = YYSTACK_ALLOC_MAXIMUM;
      return 1;
    }

  /* Avoid sprintf, as that infringes on the user's name space.
     Don't have undefined behavior even if the translation
     produced a string with the wrong number of "%s"s.  */
  {
    char *yyp = *yymsg;
    int yyi = 0;
    while ((*yyp = *yyformat) != '\0')
      if (*yyp == '%' && yyformat[1] == 's' && yyi < yycount)
        {
          yyp += yytnamerr (yyp, yyarg[yyi++]);
          yyformat += 2;
        }
      else
        {
          yyp++;
          yyformat++;
        }
  }
  return 0;
}
#endif /* YYERROR_VERBOSE */

/*-----------------------------------------------.
| Release the memory associated to this symbol.  |
`-----------------------------------------------*/

static void
yydestruct (const char *yymsg, int yytype, YYSTYPE *yyvaluep)
{
  YYUSE (yyvaluep);
  if (!yymsg)
    yymsg = "Deleting";
  YY_SYMBOL_PRINT (yymsg, yytype, yyvaluep, yylocationp);

  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  YYUSE (yytype);
  YY_IGNORE_MAYBE_UNINITIALIZED_END
}




/* The lookahead symbol.  */
int yychar;

/* The semantic value of the lookahead symbol.  */
YYSTYPE yylval;
/* Number of syntax errors so far.  */
int yynerrs;


/*----------.
| yyparse.  |
`----------*/

int
yyparse (void)
{
    int yystate;
    /* Number of tokens to shift before error messages enabled.  */
    int yyerrstatus;

    /* The stacks and their tools:
       'yyss': related to states.
       'yyvs': related to semantic values.

       Refer to the stacks through separate pointers, to allow yyoverflow
       to reallocate them elsewhere.  */

    /* The state stack.  */
    yytype_int16 yyssa[YYINITDEPTH];
    yytype_int16 *yyss;
    yytype_int16 *yyssp;

    /* The semantic value stack.  */
    YYSTYPE yyvsa[YYINITDEPTH];
    YYSTYPE *yyvs;
    YYSTYPE *yyvsp;

    YYSIZE_T yystacksize;

  int yyn;
  int yyresult;
  /* Lookahead token as an internal (translated) token number.  */
  int yytoken = 0;
  /* The variables used to return semantic value and location from the
     action routines.  */
  YYSTYPE yyval;

#if YYERROR_VERBOSE
  /* Buffer for error messages, and its allocated size.  */
  char yymsgbuf[128];
  char *yymsg = yymsgbuf;
  YYSIZE_T yymsg_alloc = sizeof yymsgbuf;
#endif

#define YYPOPSTACK(N)   (yyvsp -= (N), yyssp -= (N))

  /* The number of symbols on the RHS of the reduced rule.
     Keep to zero when no symbol should be popped.  */
  int yylen = 0;

  yyssp = yyss = yyssa;
  yyvsp = yyvs = yyvsa;
  yystacksize = YYINITDEPTH;

  YYDPRINTF ((stderr, "Starting parse\n"));

  yystate = 0;
  yyerrstatus = 0;
  yynerrs = 0;
  yychar = YYEMPTY; /* Cause a token to be read.  */
  goto yysetstate;

/*------------------------------------------------------------.
| yynewstate -- Push a new state, which is found in yystate.  |
`------------------------------------------------------------*/
 yynewstate:
  /* In all cases, when you get here, the value and location stacks
     have just been pushed.  So pushing a state here evens the stacks.  */
  yyssp++;

 yysetstate:
  *yyssp = yystate;

  if (yyss + yystacksize - 1 <= yyssp)
    {
      /* Get the current used size of the three stacks, in elements.  */
      YYSIZE_T yysize = yyssp - yyss + 1;

#ifdef yyoverflow
      {
        /* Give user a chance to reallocate the stack.  Use copies of
           these so that the &'s don't force the real ones into
           memory.  */
        YYSTYPE *yyvs1 = yyvs;
        yytype_int16 *yyss1 = yyss;

        /* Each stack pointer address is followed by the size of the
           data in use in that stack, in bytes.  This used to be a
           conditional around just the two extra args, but that might
           be undefined if yyoverflow is a macro.  */
        yyoverflow (YY_("memory exhausted"),
                    &yyss1, yysize * sizeof (*yyssp),
                    &yyvs1, yysize * sizeof (*yyvsp),
                    &yystacksize);

        yyss = yyss1;
        yyvs = yyvs1;
      }
#else /* no yyoverflow */
# ifndef YYSTACK_RELOCATE
      goto yyexhaustedlab;
# else
      /* Extend the stack our own way.  */
      if (YYMAXDEPTH <= yystacksize)
        goto yyexhaustedlab;
      yystacksize *= 2;
      if (YYMAXDEPTH < yystacksize)
        yystacksize = YYMAXDEPTH;

      {
        yytype_int16 *yyss1 = yyss;
        union yyalloc *yyptr =
          (union yyalloc *) YYSTACK_ALLOC (YYSTACK_BYTES (yystacksize));
        if (! yyptr)
          goto yyexhaustedlab;
        YYSTACK_RELOCATE (yyss_alloc, yyss);
        YYSTACK_RELOCATE (yyvs_alloc, yyvs);
#  undef YYSTACK_RELOCATE
        if (yyss1 != yyssa)
          YYSTACK_FREE (yyss1);
      }
# endif
#endif /* no yyoverflow */

      yyssp = yyss + yysize - 1;
      yyvsp = yyvs + yysize - 1;

      YYDPRINTF ((stderr, "Stack size increased to %lu\n",
                  (unsigned long int) yystacksize));

      if (yyss + yystacksize - 1 <= yyssp)
        YYABORT;
    }

  YYDPRINTF ((stderr, "Entering state %d\n", yystate));

  if (yystate == YYFINAL)
    YYACCEPT;

  goto yybackup;

/*-----------.
| yybackup.  |
`-----------*/
yybackup:

  /* Do appropriate processing given the current state.  Read a
     lookahead token if we need one and don't already have one.  */

  /* First try to decide what to do without reference to lookahead token.  */
  yyn = yypact[yystate];
  if (yypact_value_is_default (yyn))
    goto yydefault;

  /* Not known => get a lookahead token if don't already have one.  */

  /* YYCHAR is either YYEMPTY or YYEOF or a valid lookahead symbol.  */
  if (yychar == YYEMPTY)
    {
      YYDPRINTF ((stderr, "Reading a token: "));
      yychar = yylex ();
    }

  if (yychar <= YYEOF)
    {
      yychar = yytoken = YYEOF;
      YYDPRINTF ((stderr, "Now at end of input.\n"));
    }
  else
    {
      yytoken = YYTRANSLATE (yychar);
      YY_SYMBOL_PRINT ("Next token is", yytoken, &yylval, &yylloc);
    }

  /* If the proper action on seeing token YYTOKEN is to reduce or to
     detect an error, take that action.  */
  yyn += yytoken;
  if (yyn < 0 || YYLAST < yyn || yycheck[yyn] != yytoken)
    goto yydefault;
  yyn = yytable[yyn];
  if (yyn <= 0)
    {
      if (yytable_value_is_error (yyn))
        goto yyerrlab;
      yyn = -yyn;
      goto yyreduce;
    }

  /* Count tokens shifted since error; after three, turn off error
     status.  */
  if (yyerrstatus)
    yyerrstatus--;

  /* Shift the lookahead token.  */
  YY_SYMBOL_PRINT ("Shifting", yytoken, &yylval, &yylloc);

  /* Discard the shifted token.  */
  yychar = YYEMPTY;

  yystate = yyn;
  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  *++yyvsp = yylval;
  YY_IGNORE_MAYBE_UNINITIALIZED_END

  goto yynewstate;


/*-----------------------------------------------------------.
| yydefault -- do the default action for the current state.  |
`-----------------------------------------------------------*/
yydefault:
  yyn = yydefact[yystate];
  if (yyn == 0)
    goto yyerrlab;
  goto yyreduce;


/*-----------------------------.
| yyreduce -- Do a reduction.  |
`-----------------------------*/
yyreduce:
  /* yyn is the number of a rule to reduce with.  */
  yylen = yyr2[yyn];

  /* If YYLEN is nonzero, implement the default value of the action:
     '$$ = $1'.

     Otherwise, the following line sets YYVAL to garbage.
     This behavior is undocumented and Bison
     users should not rely upon it.  Assigning to YYVAL
     unconditionally makes the parser a bit smaller, and it avoids a
     GCC warning that YYVAL may be used uninitialized.  */
  yyval = yyvsp[1-yylen];


  YY_REDUCE_PRINT (yyn);
  switch (yyn)
    {
        case 18:
#line 163 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    ExportDefInfo edi((yyvsp[-2]).getName());
    edi.write_cpp_header();
 }
#line 1605 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 19:
#line 171 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    esp_def_export_tag=strdup((yyvsp[-2]).getName());
 }
#line 1613 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 20:
#line 178 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    AddEspService();
    //Now the default is sorted
    if (CurService->getMetaInt("sort_method",1)!=0)
        CurService->sortMethods();  
    CurService->write_esp_interface();
    CurService->write_event_interface();
    CurService->write_client_interface();
    CurService=NULL;
 }
#line 1628 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 21:
#line 192 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurService=new EspServInfo((yyvsp[0]).getName());
    if (CurService)
    {
        CurService->tags = getClearCurMetaTags();

        StrBuffer minPingVer;
        for (MetaTagInfo* t = CurService->tags; t!=NULL; t = t->next)
        {
            if (streq("ping_min_ver",t->getName()))
            {
                minPingVer.set(t->getString());
                break;
            }
        }

        VStrBuffer reqname("%sPingRequest", (yyvsp[0]).getName());
        CurEspMessage = new EspMessageInfo(reqname.str(), EspMessageInfo::espm_request);
        CurEspMessage->write_cpp_interfaces();

        if(minPingVer.length()!=0)
        {
            CurMetaTags = NULL;
            AddMetaTag(new MetaTagInfo("min_ver", minPingVer.str()));
            CurEspMessage->tags = getClearCurMetaTags();
         }

        AddEspMessage();
        CurEspMessage=NULL;

        VStrBuffer respname("%sPingResponse", (yyvsp[0]).getName());
        CurEspMessage = new EspMessageInfo(respname.str(), EspMessageInfo::espm_response);
        CurEspMessage->write_cpp_interfaces();
        if(minPingVer.length()!=0)
        {
            CurMetaTags = NULL;
            AddMetaTag(new MetaTagInfo("min_ver", minPingVer.str()));
            CurEspMessage->tags = getClearCurMetaTags();
         }

        AddEspMessage();

        EspMethodInfo *method=new EspMethodInfo("Ping", reqname.str(), respname.str());

        if(minPingVer.length()!=0)
        {
            CurMetaTags = NULL;
            AddMetaTag(new MetaTagInfo("min_ver", minPingVer.str()));
            method->tags = getClearCurMetaTags();
         }

        method->next=CurService->methods;
        CurService->methods=method;

        CurMetaTags   = NULL;
        CurEspMessage = NULL;
    }
 }
#line 1691 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 29:
#line 270 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurService)
    {
        EspMethodInfo *method=new EspMethodInfo((yyvsp[-6]).getName(), (yyvsp[-4]).getName(), (yyvsp[-2]).getName());

        method->tags = getClearCurMetaTags();

        method->next=CurService->methods;
        CurService->methods=method;
    }
 }
#line 1707 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 30:
#line 282 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurService && CurProc)
    {
        CurEspMessage = new EspMessageInfo(EspMessageInfo::espm_request, CurProc);
        CurEspMessage->write_cpp_interfaces();
        AddEspMessage();
        CurEspMessage=NULL;
    
        CurEspMessage = new EspMessageInfo(EspMessageInfo::espm_response, CurProc);
        CurEspMessage->write_cpp_interfaces();
        AddEspMessage();
        CurEspMessage=NULL;

        EspMethodInfo *method = new EspMethodInfo(CurProc);
        CurProc=NULL;

        method->next=CurService->methods;
        CurService->methods=method;
    }
 }
#line 1732 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 31:
#line 306 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    EspMountInfo *mount=new EspMountInfo((yyvsp[-4]).getName(), (yyvsp[-2]).getString());

    mount->tags = getClearCurMetaTags();

    mount->next=CurService->mounts;
    CurService->mounts=mount;
 }
#line 1745 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 32:
#line 318 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurEspMessage->write_cpp_interfaces();
    AddEspMessage();
    CurEspMessage=NULL;
 }
#line 1755 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 33:
#line 327 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurEspMessage = new EspMessageInfo((yyvsp[0]).getName(), EspMessageInfo::espm_struct);
    CurEspMessage->tags = getClearCurMetaTags();
    CurParam=NULL;
 }
#line 1765 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 34:
#line 338 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurEspMessage->write_cpp_interfaces();
    AddEspMessage();
    CurEspMessage=NULL;
 }
#line 1775 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 35:
#line 347 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurEspMessage = new EspMessageInfo((yyvsp[0]).getName(), EspMessageInfo::espm_enum);
    CurEspMessage->tags = getClearCurMetaTags();
    CurParam=NULL;
 }
#line 1785 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 36:
#line 356 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurEspMessage->getParentName())
        yyerror("parent is already specified by meta extends");
    CurEspMessage->setParentName((yyvsp[0]).getName());
 }
#line 1795 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 37:
#line 362 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    yyerror("base type must be specified for enumeration type");
 }
#line 1803 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 38:
#line 369 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    (yyval).setName("int");
 }
#line 1811 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 39:
#line 373 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    (yyval).setName("short");
 }
#line 1819 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 40:
#line 377 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    (yyval).setName("string");
 }
#line 1827 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 41:
#line 381 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    (yyval).setName("double");
 }
#line 1835 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 42:
#line 388 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurParam=NULL;
    LastParam=NULL;
 }
#line 1844 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 43:
#line 393 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {  yyerror("Enum can not be empty");  }
#line 1850 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 46:
#line 403 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurParam = new ParamInfo;
    CurParam->name = strdup((yyvsp[-3]).getName());
    CurParam->kind = TK_ENUM;
    CurParam->tags = getClearCurMetaTags();
    AddEspProperty(); 
 }
#line 1862 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 47:
#line 411 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurParam = new ParamInfo;
    CurParam->name = strdup((yyvsp[-5]).getName());
    CurParam->kind = TK_ENUM;
    AddMetaTag(new MetaTagInfo("desc", (yyvsp[-1]).getString()));
    CurParam->tags = getClearCurMetaTags();;
    AddEspProperty(); 
 }
#line 1875 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 48:
#line 420 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurParam = new ParamInfo;
    CurParam->name = strdup((yyvsp[0]).getName());
    CurParam->kind = TK_ENUM;
    AddMetaTag(new MetaTagInfo("enum", VStrBuffer("\"%s\"", (yyvsp[0]).getName()).str()));
    CurParam->tags = getClearCurMetaTags();

    AddEspProperty(); 
 }
#line 1889 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 51:
#line 438 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    int val = (yyvsp[0]).getInt();
    AddMetaTag(new MetaTagInfo("enum", val));
 }
#line 1898 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 52:
#line 443 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    double val = (yyvsp[0]).getDouble();
    AddMetaTag(new MetaTagInfo("enum", val));
 }
#line 1907 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 53:
#line 448 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    const char* val = (yyvsp[0]).getString();
    AddMetaTag(new MetaTagInfo("enum", val));
 }
#line 1916 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 54:
#line 456 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurInclude = new IncludeInfo((yyvsp[-2]).getName());
    CurInclude->write_cpp_interfaces();

    AddEspInclude();
    CurInclude=NULL;
 }
#line 1928 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 55:
#line 467 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurEspMessage->write_cpp_interfaces();
    AddEspMessage();
    CurEspMessage=NULL;
 }
#line 1938 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 56:
#line 476 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurEspMessage = new EspMessageInfo((yyvsp[0]).getName(), EspMessageInfo::espm_request);
    CurEspMessage->tags = getClearCurMetaTags();
    CurParam=NULL;
 }
#line 1948 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 57:
#line 486 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurEspMessage->write_cpp_interfaces();
    AddEspMessage();
    CurEspMessage=NULL;
 }
#line 1958 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 58:
#line 495 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurEspMessage = new EspMessageInfo((yyvsp[0]).getName(), EspMessageInfo::espm_response);
    CurEspMessage->tags = getClearCurMetaTags();
    CurParam=NULL;
 }
#line 1968 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 59:
#line 504 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurEspMessage->getParentName())
        yyerror("parent is already specified by meta extends");
    CurEspMessage->setParentName((yyvsp[0]).getName());
 }
#line 1978 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 61:
#line 514 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurParam=NULL;
    LastParam=NULL;
 }
#line 1987 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 65:
#line 528 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurParam)
    {
        if (CurParam->name && ((CurParam->flags & PF_RETURN)==0)) 
        {
            if (CurParam->kind==TK_null) 
            {
                CurParam->kind = TK_STRUCT;
                CurParam->typname = CurParam->name;
            }
            else 
            {
                errnum = 9;
                yyerror("unknown/unexpected ID");
            }
        }
    
        CurParam->flags |= PF_TEMPLATE;
        CurParam->templ = strdup((yyvsp[-6]).getName());
        CurParam->name = strdup((yyvsp[-2]).getName());
        CurParam->tags = getClearCurMetaTags();
    }
    else
        CurMetaTags=NULL;
    AddEspProperty(); 
 }
#line 2018 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 66:
#line 555 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurParam)
    {
        if (CurParam->name && ((CurParam->flags & PF_RETURN)==0)) 
        {
            if (CurParam->kind==TK_null) 
            {
                CurParam->kind = TK_STRUCT;
                CurParam->typname = CurParam->name;
            }
            else 
            {
                errnum = 21;
                yyerror("invalid type declaration in template");
            }
        }
    
        CurParam->flags |= PF_TEMPLATE;
        CurParam->templ = strdup((yyvsp[-8]).getName());
        CurParam->name = strdup((yyvsp[-2]).getName());

        AddMetaTag(new MetaTagInfo("item_tag", (yyvsp[-4]).getName()));

        CurParam->tags = getClearCurMetaTags();
    }
    else
        CurMetaTags=NULL;
    AddEspProperty(); 
 }
#line 2052 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 67:
#line 585 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurParam)
    {
        CurParam->flags |= PF_TEMPLATE;
        CurParam->templ = strdup((yyvsp[-6]).getName());
        CurParam->name = strdup((yyvsp[-3]).getName());
        CurParam->typname = CurParam->name;
        CurParam->name = strdup((yyvsp[-1]).getName());
        CurParam->tags = getClearCurMetaTags();
    }
    else
        CurMetaTags=NULL;
    AddEspProperty(); 
 }
#line 2071 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 68:
#line 600 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurParam)
    {
        CurParam->flags |= PF_TEMPLATE;
        CurParam->templ = strdup((yyvsp[-8]).getName());
        CurParam->name = strdup((yyvsp[-5]).getName());
        CurParam->typname = CurParam->name;
        CurParam->name = strdup((yyvsp[-1]).getName());

        AddMetaTag(new MetaTagInfo("item_tag", (yyvsp[-3]).getName()));

        CurParam->tags = getClearCurMetaTags();
    }
    else
        CurMetaTags=NULL;
    AddEspProperty(); 
 }
#line 2093 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 69:
#line 618 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurParam)
    {
        CurParam->name=strdup((yyvsp[-1]).getName());
        CurParam->typname=strdup((yyvsp[-2]).getName());
        CurParam->kind=TK_ESPSTRUCT;
        CurParam->tags = getClearCurMetaTags();
        AddEspProperty(); 
    }
 }
#line 2108 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 70:
#line 629 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurParam)
    {
        CurParam->name=strdup((yyvsp[-2]).getName());
        CurParam->typname=strdup((yyvsp[-3]).getName());
        CurParam->kind=TK_ESPENUM;
        CurParam->tags = getClearCurMetaTags();
        AddEspProperty(); 
    }
 }
#line 2123 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 71:
#line 640 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurParam)
    {
        //special well known types
        if (CurParam->kind==TK_STRUCT)
        {
            if (!strcmp(CurParam->typname, "int64"))
                CurParam->kind=TK_INT;
        }
        CurParam->tags = getClearCurMetaTags();
        AddEspProperty(); 
    }
 }
#line 2141 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 72:
#line 657 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo("default", (yyvsp[-1]).getInt()));
 }
#line 2149 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 73:
#line 661 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo("default", (yyvsp[-1]).getString()));
 }
#line 2157 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 74:
#line 665 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
 }
#line 2164 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 75:
#line 671 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    int val = (yyvsp[-1]).getInt();
    AddMetaTag(new MetaTagInfo("default", val));
 }
#line 2173 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 76:
#line 676 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    int val = -(yyvsp[-1]).getInt();
    AddMetaTag(new MetaTagInfo("default", val));
 }
#line 2182 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 77:
#line 681 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    double val = (yyvsp[0]).getDouble();
    AddMetaTag(new MetaTagInfo("default", val));
 }
#line 2191 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 78:
#line 686 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    double val = -(yyvsp[-1]).getDouble();
    AddMetaTag(new MetaTagInfo("default", val));
 }
#line 2200 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 79:
#line 691 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo("default", (yyvsp[-1]).getInt()));
 }
#line 2208 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 80:
#line 695 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo("default", (yyvsp[-1]).getString()));
 }
#line 2216 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 81:
#line 699 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo("default", 0));
 }
#line 2224 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 82:
#line 703 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    //AddMetaTag(new MetaTagInfo("default", 0));
 }
#line 2232 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 84:
#line 714 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
 }
#line 2239 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 85:
#line 717 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
 }
#line 2246 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 88:
#line 744 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {  CurParam->kind = TK_ESPENUM; }
#line 2252 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 94:
#line 760 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo((yyvsp[-3]).getName(), (yyvsp[-1]).getInt()));
 }
#line 2260 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 95:
#line 764 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo((yyvsp[-3]).getName(), (yyvsp[-1]).getString()));
 }
#line 2268 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 96:
#line 768 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo((yyvsp[-3]).getName(), (yyvsp[-1]).getDouble()));
 }
#line 2276 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 97:
#line 772 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo((yyvsp[-3]).getName(), (yyvsp[-1]).getName(),true));
 }
#line 2284 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 98:
#line 776 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo((yyvsp[0]).getName(), 1));
 }
#line 2292 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 99:
#line 783 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurModule) {
        CurModule->write_header_class();
    }
    AddModule();
    CurModule = NULL;
 }
#line 2304 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 100:
#line 795 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurModule = new ModuleInfo((yyvsp[0]).getName());
   LastProc = NULL;
 }
#line 2313 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 101:
#line 800 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurModule = new ModuleInfo((yyvsp[0]).getName());
   CurModule->isSCMinterface = true;
   LastProc = NULL;
 }
#line 2323 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 102:
#line 810 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurModule->version = (yyvsp[-1]).getInt();
   if ((CurModule->version>255)||(CurModule->version<0))
   {
        errnum = 5;
        yyerror("version must be in range 0-255");
   } 
 }
#line 2336 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 103:
#line 819 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurModule->base = strdup((yyvsp[-1]).getName());
 }
#line 2344 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 107:
#line 833 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurEnum) {
        CurEnum->write_header_enum();
    }
    AddEnum();
    CurEnum = NULL;
 }
#line 2356 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 108:
#line 845 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   EnumValue = 0;
   CurEnum = new EnumInfo((yyvsp[0]).getName());
   LastEnumVal = NULL;
 }
#line 2366 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 110:
#line 859 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   if (CurEnumVal)
   {
     if (LastEnumVal)
       LastEnumVal->next = CurEnumVal;
     else
       CurEnum->vals = CurEnumVal;
     LastEnumVal = CurEnumVal;
   }
 }
#line 2381 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 111:
#line 870 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   if (CurEnumVal)
   {
     LastEnumVal->next = CurEnumVal;
     LastEnumVal = CurEnumVal;
   } 
 }
#line 2393 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 112:
#line 881 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    EnumValue = (yyvsp[0]).getInt();
    CurEnumVal = new EnumValInfo((yyvsp[-2]).getName(),EnumValue);
    EnumValue++;
 }
#line 2403 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 113:
#line 887 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    EnumValue = - (yyvsp[0]).getInt();
    CurEnumVal = new EnumValInfo((yyvsp[-3]).getName(),EnumValue);
    EnumValue++;
 }
#line 2413 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 114:
#line 893 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurEnumVal = new EnumValInfo((yyvsp[0]).getName(),EnumValue);
    EnumValue++;
 }
#line 2422 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 115:
#line 902 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   if (CurApi)
   {
      CurApi->proc = CurProc;
       AddApi();
      CurApi->write_header_method();

       CurApi = NULL;
      CurProc = NULL;
      LastParam = NULL;
   }
 }
#line 2439 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 116:
#line 918 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    outf(0, "const double %s = %f;", (yyvsp[-4]).getName(), (yyvsp[-2]).getDouble());
 }
#line 2447 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 117:
#line 925 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurApi = new ApiInfo(hcp->getPackageName());
   CurProc = new ProcInfo();
    CurModule = NULL;
   LastProc = NULL;
 }
#line 2458 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 118:
#line 932 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurApi = new ApiInfo(hcp->getPackageName());
   CurProc = new ProcInfo();
    CurModule = NULL;
   LastProc = NULL;
 }
#line 2469 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 119:
#line 939 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurApi = new ApiInfo((yyvsp[-1]).getName());
   CurProc = new ProcInfo();
    CurModule = NULL;
   LastProc = NULL;
 }
#line 2480 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 120:
#line 951 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   if (CurProc)
   {
     if (LastProc)
       LastProc->next = CurProc;
     else
       CurModule->procs = CurProc;
     LastProc = CurProc;
   }
 }
#line 2495 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 121:
#line 962 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   if (CurProc)
   {
     LastProc->next = CurProc;
     LastProc = CurProc;
   } 
 }
#line 2507 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 122:
#line 973 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   LastParam = NULL;
 }
#line 2515 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 129:
#line 994 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurParam)
   {
     if (CurProc->async && CurParam)
     {
       errnum = 6;
       yyerror("Return not allowed");
     }
     if (CurProc->name)
        free(CurProc->name);
     CurProc->name = CurParam->name;
     CurParam->name = strdup(RETURNNAME);
   }
   CurProc->rettype = CurParam;
   CurParam = NULL;
 }
#line 2536 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 130:
#line 1014 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   if (LastParam)
     LastParam->next = CurParam;
   else
     CurProc->params = CurParam;
   LastParam = CurParam;
 }
#line 2548 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 131:
#line 1022 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   LastParam->next = CurParam;
   LastParam = CurParam;
 }
#line 2557 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 132:
#line 1031 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   if ((CurParam->flags&(PF_IN|PF_OUT))==0)
     CurParam->flags |= PF_IN;
 }
#line 2566 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 140:
#line 1054 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   LastLayout = NULL;
 }
#line 2574 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 141:
#line 1061 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   if (LastLayout)
     LastLayout->next = CurLayout;
   else
     CurParam->layouts = CurLayout;
   LastLayout = CurLayout;
 }
#line 2586 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 142:
#line 1069 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   LastLayout->next = CurLayout;
   LastLayout = CurLayout;
 }
#line 2595 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 144:
#line 1081 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurLayout->count = strdup((yyvsp[0]).getName());
 }
#line 2603 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 146:
#line 1089 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurLayout->size = strdup((yyvsp[0]).getName());
 }
#line 2611 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 147:
#line 1093 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurLayout->size = strdup((yyvsp[0]).getName());
 }
#line 2619 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 148:
#line 1097 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurLayout->size = (char*)malloc(strlen((yyvsp[0]).getName())+2);
   strcpy(CurLayout->size, "-");
   strcat(CurLayout->size, (yyvsp[0]).getName());
 }
#line 2629 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 149:
#line 1106 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurLayout = new LayoutInfo;
 }
#line 2637 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 150:
#line 1113 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurParam->flags |= PF_STRING;
    CurParam->setXsdType((yyvsp[0]).getName());
 }
#line 2646 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 151:
#line 1122 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurParam->flags |= PF_IN;
 }
#line 2654 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 152:
#line 1126 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurParam->flags |= PF_OUT;
 }
#line 2662 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 153:
#line 1130 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurParam->flags |= (PF_IN|PF_OUT);
 }
#line 2670 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 154:
#line 1137 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   rettype = true;
 }
#line 2678 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 155:
#line 1144 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurParam = new ParamInfo;
   rettype = false;
 }
#line 2687 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 156:
#line 1152 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurParam->flags |= PF_VARSIZE;
   CurParam->size = strdup((yyvsp[-1]).getName());
 }
#line 2696 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 157:
#line 1157 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurParam->flags |= PF_VARSIZE;
   CurParam->sizebytes = strdup((yyvsp[-1]).getName());
 }
#line 2705 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 158:
#line 1165 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   (yyval).setNameF("%d", (yyvsp[0]).getInt());
 }
#line 2713 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 159:
#line 1169 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   (yyval).setName((yyvsp[0]).getName());
 }
#line 2721 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 162:
#line 1181 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   switch(CurParam->kind)
   {
     case TK_UNSIGNED:  
       CurParam->kind = TK_UNSIGNEDCHAR; 
       break;
     case TK_null:
       CurParam->kind = TK_CHAR; 
       break;
     default: 
     {
       errnum = 7;
       yyerror("invalid type");
     }
   }
 }
#line 2742 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 163:
#line 1198 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   switch(CurParam->kind)
   {
     case TK_null:
       CurParam->kind = TK_BYTE; 
       break;
     default: 
     {
       errnum = 7;
       yyerror("invalid type");
     }
   }
 }
#line 2760 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 164:
#line 1212 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   switch(CurParam->kind)
   {
     case TK_null:
       CurParam->kind = TK_BOOL; 
       break;
     default: 
     {
       errnum = 7;
       yyerror("invalid type");
     }
   }
 }
#line 2778 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 165:
#line 1226 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   switch(CurParam->kind)
   {
     case TK_UNSIGNED:  
       CurParam->kind = TK_UNSIGNEDSHORT; 
       break;
     case TK_null:
       CurParam->kind = TK_SHORT; 
       break;
     default: 
     {
       errnum = 7;
       yyerror("invalid type");
     }
   }
 }
#line 2799 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 166:
#line 1243 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurParam->kind = TK_VOID;
 }
#line 2807 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 167:
#line 1247 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   switch(CurParam->kind)
   {
     case TK_UNSIGNED: 
       break;
     case TK_SHORT:
       CurParam->kind = TK_SHORT; 
       break;
     case TK_LONG:
       CurParam->kind = TK_LONG;
       break;   
     case TK_null:
       CurParam->kind = TK_INT; 
       break;
     default: 
     {
       errnum = 7;
       yyerror("invalid type");
     }
   }
 }
#line 2833 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 168:
#line 1269 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   switch(CurParam->kind)
   {
     case TK_null:
       CurParam->kind = TK_UNSIGNED; 
       break;
     default: 
     {
       errnum = 7;
       yyerror("invalid type");
     }
   }
 }
#line 2851 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 169:
#line 1283 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   switch(CurParam->kind)
   {
     case TK_LONG:
       CurParam->kind = TK_LONGLONG;
       break;
     case TK_UNSIGNED:  
       CurParam->kind = TK_UNSIGNEDLONG; 
       break;
     case TK_UNSIGNEDLONG:
       CurParam->kind = TK_UNSIGNEDLONGLONG;
       break;
     case TK_null:
       CurParam->kind = TK_LONG; 
       break;
     default: 
     {
       errnum = 7;
       yyerror("invalid type");
     }
   }
 }
#line 2878 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 170:
#line 1306 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurParam->flags&(PF_PTR|PF_REF)) 
    {
        errnum = 8;
        yyerror("parameter type not supported");
    }
    else
    {
        CurParam->flags|=PF_PTR;
    }
 }
#line 2894 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 171:
#line 1318 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    if (CurParam->flags&(PF_REF)) 
    {
        errnum = 8;
        yyerror("parameter type not supported");
    }
    else
    {
        CurParam->flags|=PF_REF;
    }
 }
#line 2910 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 172:
#line 1330 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurParam->flags |= PF_CONST;
 }
#line 2918 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 173:
#line 1334 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   switch(CurParam->kind)
   {
     case TK_null:
       CurParam->kind = TK_DOUBLE; 
       break;
     default: 
     {
       errnum = 7;
       yyerror("invalid type");
     }
   }
 }
#line 2936 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 174:
#line 1348 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   switch(CurParam->kind)
   {
     case TK_null:
       CurParam->kind = TK_FLOAT; 
       break;
     default: 
     {
       errnum = 7;
       yyerror("invalid type");
     }
   }
 }
#line 2954 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 175:
#line 1362 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurParam->setXsdType((yyvsp[0]).getName());
 }
#line 2962 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 176:
#line 1366 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   if (rettype)
   {
     if (!CurParam) 
     {
       errnum = 9;
       yyerror("unknown/unexpected ID");
     }
     else if (CurParam->kind==TK_null) 
     {
       CurParam->kind = TK_STRUCT;
       CurParam->typname = strdup((yyvsp[0]).getName());
     } 
     else if ((CurParam->kind==TK_VOID)&&((CurParam->flags&PF_PTR)==0)) 
     {
       CurProc->name = strdup((yyvsp[0]).getName());
       delete CurParam;
       CurParam = NULL;
     }
     else 
     {
       CurParam->flags |= (PF_OUT|PF_RETURN);
       check_param();
     } 
   }
   if (CurParam)
   {
     if (CurParam->name && ((CurParam->flags&PF_RETURN)==0)) 
     {
       if (CurParam->kind==TK_null) 
       {
         CurParam->kind = TK_STRUCT;
         CurParam->typname = strdup(CurParam->name);
       }
       else 
       {
         errnum = 9;
         yyerror("unknown/unexpected ID");
       }
     }
     if (CurParam->name)
        free(CurParam->name);
     CurParam->name = strdup((yyvsp[0]).getName());
   }
 }
#line 3012 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 177:
#line 1416 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurProc = new ProcInfo();
   if (CurModule!=NULL && CurModule->isSCMinterface)
      CurProc->virt = 2;
 }
#line 3022 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 178:
#line 1425 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   if (CurProc->virt==0)
      CurProc->virt = 1;
 }
#line 3031 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 179:
#line 1433 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   if (CurProc->virt && ((yyvsp[0]).getInt()==0))
     CurProc->virt = 2;
   else
   {
     errnum = 10;
     yyerror("abstract not allowed on non-virtual");
   } 
 }
#line 3045 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 181:
#line 1447 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurProc->constfunc = 1;
 }
#line 3053 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 183:
#line 1455 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurProc->callback = 1;
 }
#line 3061 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 184:
#line 1462 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
   CurProc->async = 1;
 }
#line 3069 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 185:
#line 1469 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    CurProc->conntimeout = strdup((yyvsp[-3]).getName());
    CurProc->calltimeout = strdup((yyvsp[-1]).getName());
 }
#line 3078 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;

  case 187:
#line 1478 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1646  */
    {
    //note: we return {"string"} with quotes on both sides
     size_t len1 = strlen((yyvsp[-1]).getString());
     size_t len2 = strlen((yyvsp[0]).getString());
     char* s = (char*)malloc(len1+len2-1);
     memcpy(s, (yyvsp[-1]).getString(), len1-1);
     memcpy(s+len1-1, (yyvsp[0]).getString()+1, len2);
     (yyval).setVal(s);
 }
#line 3092 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
    break;


#line 3096 "/home/sathvik/hpcc/HPCC-Platform/build/tools/hidl/hidlgram.cpp" /* yacc.c:1646  */
      default: break;
    }
  /* User semantic actions sometimes alter yychar, and that requires
     that yytoken be updated with the new translation.  We take the
     approach of translating immediately before every use of yytoken.
     One alternative is translating here after every semantic action,
     but that translation would be missed if the semantic action invokes
     YYABORT, YYACCEPT, or YYERROR immediately after altering yychar or
     if it invokes YYBACKUP.  In the case of YYABORT or YYACCEPT, an
     incorrect destructor might then be invoked immediately.  In the
     case of YYERROR or YYBACKUP, subsequent parser actions might lead
     to an incorrect destructor call or verbose syntax error message
     before the lookahead is translated.  */
  YY_SYMBOL_PRINT ("-> $$ =", yyr1[yyn], &yyval, &yyloc);

  YYPOPSTACK (yylen);
  yylen = 0;
  YY_STACK_PRINT (yyss, yyssp);

  *++yyvsp = yyval;

  /* Now 'shift' the result of the reduction.  Determine what state
     that goes to, based on the state we popped back to and the rule
     number reduced by.  */

  yyn = yyr1[yyn];

  yystate = yypgoto[yyn - YYNTOKENS] + *yyssp;
  if (0 <= yystate && yystate <= YYLAST && yycheck[yystate] == *yyssp)
    yystate = yytable[yystate];
  else
    yystate = yydefgoto[yyn - YYNTOKENS];

  goto yynewstate;


/*--------------------------------------.
| yyerrlab -- here on detecting error.  |
`--------------------------------------*/
yyerrlab:
  /* Make sure we have latest lookahead translation.  See comments at
     user semantic actions for why this is necessary.  */
  yytoken = yychar == YYEMPTY ? YYEMPTY : YYTRANSLATE (yychar);

  /* If not already recovering from an error, report this error.  */
  if (!yyerrstatus)
    {
      ++yynerrs;
#if ! YYERROR_VERBOSE
      yyerror (YY_("syntax error"));
#else
# define YYSYNTAX_ERROR yysyntax_error (&yymsg_alloc, &yymsg, \
                                        yyssp, yytoken)
      {
        char const *yymsgp = YY_("syntax error");
        int yysyntax_error_status;
        yysyntax_error_status = YYSYNTAX_ERROR;
        if (yysyntax_error_status == 0)
          yymsgp = yymsg;
        else if (yysyntax_error_status == 1)
          {
            if (yymsg != yymsgbuf)
              YYSTACK_FREE (yymsg);
            yymsg = (char *) YYSTACK_ALLOC (yymsg_alloc);
            if (!yymsg)
              {
                yymsg = yymsgbuf;
                yymsg_alloc = sizeof yymsgbuf;
                yysyntax_error_status = 2;
              }
            else
              {
                yysyntax_error_status = YYSYNTAX_ERROR;
                yymsgp = yymsg;
              }
          }
        yyerror (yymsgp);
        if (yysyntax_error_status == 2)
          goto yyexhaustedlab;
      }
# undef YYSYNTAX_ERROR
#endif
    }



  if (yyerrstatus == 3)
    {
      /* If just tried and failed to reuse lookahead token after an
         error, discard it.  */

      if (yychar <= YYEOF)
        {
          /* Return failure if at end of input.  */
          if (yychar == YYEOF)
            YYABORT;
        }
      else
        {
          yydestruct ("Error: discarding",
                      yytoken, &yylval);
          yychar = YYEMPTY;
        }
    }

  /* Else will try to reuse lookahead token after shifting the error
     token.  */
  goto yyerrlab1;


/*---------------------------------------------------.
| yyerrorlab -- error raised explicitly by YYERROR.  |
`---------------------------------------------------*/
yyerrorlab:

  /* Pacify compilers like GCC when the user code never invokes
     YYERROR and the label yyerrorlab therefore never appears in user
     code.  */
  if (/*CONSTCOND*/ 0)
     goto yyerrorlab;

  /* Do not reclaim the symbols of the rule whose action triggered
     this YYERROR.  */
  YYPOPSTACK (yylen);
  yylen = 0;
  YY_STACK_PRINT (yyss, yyssp);
  yystate = *yyssp;
  goto yyerrlab1;


/*-------------------------------------------------------------.
| yyerrlab1 -- common code for both syntax error and YYERROR.  |
`-------------------------------------------------------------*/
yyerrlab1:
  yyerrstatus = 3;      /* Each real token shifted decrements this.  */

  for (;;)
    {
      yyn = yypact[yystate];
      if (!yypact_value_is_default (yyn))
        {
          yyn += YYTERROR;
          if (0 <= yyn && yyn <= YYLAST && yycheck[yyn] == YYTERROR)
            {
              yyn = yytable[yyn];
              if (0 < yyn)
                break;
            }
        }

      /* Pop the current state because it cannot handle the error token.  */
      if (yyssp == yyss)
        YYABORT;


      yydestruct ("Error: popping",
                  yystos[yystate], yyvsp);
      YYPOPSTACK (1);
      yystate = *yyssp;
      YY_STACK_PRINT (yyss, yyssp);
    }

  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  *++yyvsp = yylval;
  YY_IGNORE_MAYBE_UNINITIALIZED_END


  /* Shift the error token.  */
  YY_SYMBOL_PRINT ("Shifting", yystos[yyn], yyvsp, yylsp);

  yystate = yyn;
  goto yynewstate;


/*-------------------------------------.
| yyacceptlab -- YYACCEPT comes here.  |
`-------------------------------------*/
yyacceptlab:
  yyresult = 0;
  goto yyreturn;

/*-----------------------------------.
| yyabortlab -- YYABORT comes here.  |
`-----------------------------------*/
yyabortlab:
  yyresult = 1;
  goto yyreturn;

#if !defined yyoverflow || YYERROR_VERBOSE
/*-------------------------------------------------.
| yyexhaustedlab -- memory exhaustion comes here.  |
`-------------------------------------------------*/
yyexhaustedlab:
  yyerror (YY_("memory exhausted"));
  yyresult = 2;
  /* Fall through.  */
#endif

yyreturn:
  if (yychar != YYEMPTY)
    {
      /* Make sure we have latest lookahead translation.  See comments at
         user semantic actions for why this is necessary.  */
      yytoken = YYTRANSLATE (yychar);
      yydestruct ("Cleanup: discarding lookahead",
                  yytoken, &yylval);
    }
  /* Do not reclaim the symbols of the rule whose action triggered
     this YYABORT or YYACCEPT.  */
  YYPOPSTACK (yylen);
  YY_STACK_PRINT (yyss, yyssp);
  while (yyssp != yyss)
    {
      yydestruct ("Cleanup: popping",
                  yystos[*yyssp], yyvsp);
      YYPOPSTACK (1);
    }
#ifndef yyoverflow
  if (yyss != yyssa)
    YYSTACK_FREE (yyss);
#endif
#if YYERROR_VERBOSE
  if (yymsg != yymsgbuf)
    YYSTACK_FREE (yymsg);
#endif
  return yyresult;
}
#line 1491 "/home/sathvik/hpcc/HPCC-Platform/tools/hidl/hidlgram.y" /* yacc.c:1906  */


void AddModule()
{
   if (CurModule)
   {
     if (LastModule)
       LastModule->next = CurModule;
     else
       hcp->modules = CurModule;
     LastModule = CurModule;
   }
}

void TestOut(const char *str)
{
    outs(str);
}

void AddApi()
{
   if (CurApi)
   {
     if (LastApi)
       LastApi->next = CurApi;
     else
       hcp->apis = CurApi;
     LastApi = CurApi;
   }
}

void AddEspMessage()
{
   if (CurEspMessage)
   {
     if (LastEspMessage)
       LastEspMessage->next = CurEspMessage;
     else
       hcp->msgs = CurEspMessage;
     LastEspMessage = CurEspMessage;
   }
}

void AddEspProperty()
{
   if (CurParam)
   {
     if (LastParam)
       LastParam->next = CurParam;
     else
       CurEspMessage->setParams(CurParam);
     LastParam = CurParam;
   }
}

void AddEspService()
{
   if (CurService)
   {
     if (LastService)
       LastService->next = CurService;
     else
       hcp->servs = CurService;
     LastService = CurService;
   }
}

void AddEspInclude()
{
   if (CurInclude)
   {
     if (LastInclude)
       LastInclude->next = CurInclude;
     else
       hcp->includes = CurInclude;
     LastInclude = CurInclude;
   }
}

void AddMetaTag(MetaTagInfo *mti)
{
    mti->next=CurMetaTags;
    CurMetaTags=mti;
}

MetaTagInfo* getClearCurMetaTags()
{
    // no dup; max_ver, depr_ver can not both appear
    std::set<std::string> tagNames;
    for (MetaTagInfo* t = CurMetaTags; t!=NULL; t = t->next)
    {
        // alias
        if (streq("deprecated_ver",t->getName()))
            t->setName("depr_ver"); 

        if (tagNames.find(t->getName())!= tagNames.end()) 
        {
            VStrBuffer msg("Attribute '%s' are declared more than once", t->getName());
            yyerror(msg.str());
        }
        else 
        {           
            if ( (streq("depr_ver",t->getName()) && tagNames.find("max_ver")!=tagNames.end())
              || (streq("max_ver",t->getName()) && tagNames.find("depr_ver")!=tagNames.end()) )
                yyerror("max_ver and depr_ver can not be used together");
                
            tagNames.insert(t->getName());
        }
    }

    MetaTagInfo* ret = CurMetaTags;
    CurMetaTags = NULL;
    return ret;
}

void AddEnum()
{
   if (CurEnum)
   {
     if (LastEnum)
       LastEnum->next = CurEnum;
     else
       hcp->enums = CurEnum;
     LastEnum = CurEnum;
   }
}


extern char *yytext;
void yyerror(const char *s)
{ 
    if (!errnum)
      errnum = 99;
    if (yytext[0] == '\n')
    {
      yytext = (char*)strdup("EOL");
    }
    // the following error format work with Visual Studio double click.
    printf("%s(%d) : syntax error H%d : %s near \"%s\"\n",hcp->filename, linenum, errnum, s, yytext); 
    outf("*** %s(%d) syntax error H%d : %s near \"%s\"\n",hcp->filename, linenum, errnum, s, yytext); 
    errnum = 0;
}

void check_param(void)
{
    if (isSCM) {
        if ((CurParam->flags&PF_PTR)&&(CurParam->kind==TK_CHAR))
            CurParam->flags |= PF_STRING;
    }
    if ((CurProc->async)&&(CurParam->flags&(PF_OUT|PF_RETURN))) 
    {
        errnum = 1;
        yyerror("out parameters not allowed on async procedure");
    }
    if ((CurParam->flags&(PF_CONST&PF_OUT))==(PF_CONST|PF_OUT)) 
    {
        errnum = 2;
        yyerror("const not allowed on out parameter");
    }
    switch (CurParam->flags&(PF_IN|PF_OUT|PF_STRING|PF_VARSIZE|PF_PTR|PF_REF|PF_RETURN)) 
    {
        case PF_IN:                                 // int T
        case (PF_IN|PF_REF):                        // in T&
        case (PF_IN|PF_OUT|PF_REF):                 // inout T&
        case (PF_OUT|PF_REF):                       // out T&
        case (PF_IN|PF_PTR|PF_VARSIZE):             // in size() T*
        case (PF_OUT|PF_PTR|PF_VARSIZE):            // out size() T*
        case (PF_IN|PF_OUT|PF_PTR|PF_VARSIZE):      // inout size() T*
        case (PF_OUT|PF_PTR|PF_REF|PF_VARSIZE):     // inout size() T*&
        case (PF_IN|PF_PTR|PF_STRING):              // in string const char *
        case (PF_OUT|PF_PTR|PF_REF|PF_STRING):      // out string char *&
        case (PF_OUT|PF_RETURN):                    // return simple    
        case (PF_OUT|PF_PTR|PF_VARSIZE|PF_RETURN):  // return size() T*
        case (PF_OUT|PF_PTR|PF_STRING|PF_RETURN):   // return out string char *
            break;
        case (PF_OUT|PF_PTR|PF_RETURN):                 // return T*    
        case (PF_OUT|PF_REF|PF_RETURN):                 // return T&
            if (isSCM)
                break;
        default:
        {
            // printf("Parameter flags %x\n",p->flags);
            if (CurParam->flags&PF_RETURN )
            {
                errnum = 3;
                printf("type = %d\n",CurParam->flags);
                yyerror("Invalid return type");
            }
            else
            {
                errnum = 4;
                yyerror("Invalid parameter combination");
            }
        }
    }
}

