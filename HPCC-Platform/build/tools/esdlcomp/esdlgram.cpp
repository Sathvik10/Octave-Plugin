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
#line 1 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:339  */

#ifdef _WIN32
#pragma warning(disable:4786)
#endif

#include <stdlib.h>
#include <stdio.h>
#include <ctype.h>
#include <string.h>
#include <stdarg.h>
#include <set>
#include <string>
#include "esdl_utils.hpp"

#ifdef _WIN32
    #include <io.h>
    #include <fcntl.h>
    #include <share.h>
    #include <sys\stat.h>
#endif
#include "esdlcomp.h"

//#define YYDEBUG 1

void AddEspService();
void AddModule(void);
void AddEnum(void);
void AddMetaTag(MetaTagInfo *mti);
void AddEspInclude();
MetaTagInfo* getClearCurMetaTags();
void AddApi();
void AddEspMessage();
void AddEspMethod();
void AddEspProperty();
extern int yylex(void);
void yyerror(const char *s);

void check_param(void);

ESDLcompiler * hcp;

ModuleInfo * CurModule=NULL;
ProcInfo *   CurProc;
ParamInfo *  CurParam;
LayoutInfo * CurLayout;
EnumInfo *   CurEnum=NULL;
EnumValInfo *   CurEnumVal;
int EnumValue = 0;
ApiInfo * CurApi=NULL;
IncludeInfo *CurInclude=NULL;

EspMessageInfo * CurEspMessage=NULL;
EspServInfo * CurService=NULL;
EspMethodInfo * CurMethod=NULL;
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
EspMethodInfo * LastMethod=NULL;

char *esp_def_export_tag=NULL;

bool rettype;
unsigned linenum=1;
unsigned errnum=0;
int  nCommentStartLine = -1;


#line 144 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:339  */

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
   by #include "esdlgram.h".  */
#ifndef YY_YY_HOME_SATHVIK_HPCC_HPCC_PLATFORM_BUILD_TOOLS_ESDLCOMP_ESDLGRAM_H_INCLUDED
# define YY_YY_HOME_SATHVIK_HPCC_HPCC_PLATFORM_BUILD_TOOLS_ESDLCOMP_ESDLGRAM_H_INCLUDED
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
    ESPSTRUCT = 265,
    ESPENUM = 266,
    ESPSTRUCTREF = 267,
    ESPENUMREF = 268,
    ESPREQUEST = 269,
    ESPRESPONSE = 270,
    ESPSERVICE = 271,
    ESPMETHOD = 272,
    ESPMETHODREF = 273,
    ESPVERSIONDEF = 274,
    ESPTEMPLATE = 275,
    ESPTEMPLATELIST = 276,
    ESPMOUNT = 277,
    ESPUSES = 278,
    ESPDEFEXPORT = 279,
    ESPINCLUDE = 280,
    XSDTYPE = 281,
    ESDL_CONST = 282,
    _VOID = 283,
    _CHAR = 284,
    _BOOL = 285,
    _BYTE = 286,
    _INT = 287,
    _UNSIGNED = 288,
    _SHORT = 289,
    _LONG = 290,
    _FLOAT = 291,
    _DOUBLE = 292,
    ESDL_IN = 293,
    ESDL_OUT = 294,
    INOUT = 295,
    STRING = 296,
    _SIZE = 297,
    SIZEBYTES = 298,
    LAYOUT = 299,
    ASYNC = 300,
    ESDL_CALLBACK = 301,
    TIMEOUT = 302,
    VIRTUAL = 303,
    STAR = 304,
    UMBERSAND = 305,
    INTEGER_CONST = 306,
    STRING_CONST = 307,
    BOOL_CONST = 308,
    DOUBLE_CONST = 309,
    ID = 310,
    CONST_ID = 311
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

#endif /* !YY_YY_HOME_SATHVIK_HPCC_HPCC_PLATFORM_BUILD_TOOLS_ESDLCOMP_ESDLGRAM_H_INCLUDED  */

/* Copy the second part of user declarations.  */

#line 252 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:358  */

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
#define YYFINAL  51
/* YYLAST -- Last index in YYTABLE.  */
#define YYLAST   392

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  71
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  87
/* YYNRULES -- Number of rules.  */
#define YYNRULES  191
/* YYNSTATES -- Number of states.  */
#define YYNSTATES  375

/* YYTRANSLATE[YYX] -- Symbol number corresponding to YYX as returned
   by yylex, with out-of-bounds checking.  */
#define YYUNDEFTOK  2
#define YYMAXUTOK   311

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
      57,    58,     2,    70,    62,    66,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,    63,    59,
      64,    69,    65,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,    67,     2,    68,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    60,     2,    61,     2,     2,     2,     2,
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
      45,    46,    47,    48,    49,    50,    51,    52,    53,    54,
      55,    56
};

#if YYDEBUG
  /* YYRLINE[YYN] -- Source line where rule number YYN was defined.  */
static const yytype_uint16 yyrline[] =
{
       0,   139,   139,   143,   144,   148,   149,   150,   151,   152,
     153,   154,   155,   156,   157,   158,   159,   163,   170,   177,
     188,   249,   250,   254,   255,   259,   260,   261,   265,   272,
     312,   324,   336,   344,   355,   363,   372,   379,   385,   389,
     393,   397,   404,   409,   414,   415,   419,   423,   431,   440,
     453,   454,   458,   463,   468,   476,   484,   494,   502,   511,
     517,   521,   526,   530,   531,   535,   562,   577,   604,   634,
     649,   667,   678,   689,   706,   710,   715,   720,   725,   730,
     735,   740,   744,   748,   753,   759,   763,   766,   779,   792,
     793,   798,   799,   800,   805,   806,   810,   814,   818,   822,
     826,   834,   843,   848,   858,   867,   871,   875,   876,   881,
     890,   899,   904,   915,   926,   932,   938,   947,   962,   974,
     980,   989,   996,  1003,  1014,  1025,  1036,  1043,  1044,  1045,
    1046,  1050,  1051,  1055,  1073,  1081,  1089,  1095,  1102,  1103,
    1107,  1108,  1109,  1110,  1114,  1121,  1129,  1137,  1141,  1145,
    1149,  1153,  1157,  1167,  1173,  1182,  1186,  1190,  1197,  1205,
    1212,  1217,  1225,  1229,  1236,  1237,  1241,  1258,  1272,  1286,
    1303,  1307,  1329,  1343,  1366,  1378,  1390,  1394,  1408,  1422,
    1426,  1475,  1483,  1491,  1501,  1505,  1509,  1513,  1520,  1527,
    1535,  1536
};
#endif

#if YYDEBUG || YYERROR_VERBOSE || 0
/* YYTNAME[SYMBOL-NUM] -- String name of the symbol SYMBOL-NUM.
   First, the terminals, then, starting at YYNTOKENS, nonterminals.  */
static const char *const yytname[] =
{
  "$end", "error", "$undefined", "MODULE", "SCMAPI", "SCMEXPORTDEF",
  "SCMINTERFACE", "SCMENUM", "SCMCLARION", "SCMEND", "ESPSTRUCT",
  "ESPENUM", "ESPSTRUCTREF", "ESPENUMREF", "ESPREQUEST", "ESPRESPONSE",
  "ESPSERVICE", "ESPMETHOD", "ESPMETHODREF", "ESPVERSIONDEF",
  "ESPTEMPLATE", "ESPTEMPLATELIST", "ESPMOUNT", "ESPUSES", "ESPDEFEXPORT",
  "ESPINCLUDE", "XSDTYPE", "ESDL_CONST", "_VOID", "_CHAR", "_BOOL",
  "_BYTE", "_INT", "_UNSIGNED", "_SHORT", "_LONG", "_FLOAT", "_DOUBLE",
  "ESDL_IN", "ESDL_OUT", "INOUT", "STRING", "_SIZE", "SIZEBYTES", "LAYOUT",
  "ASYNC", "ESDL_CALLBACK", "TIMEOUT", "VIRTUAL", "STAR", "UMBERSAND",
  "INTEGER_CONST", "STRING_CONST", "BOOL_CONST", "DOUBLE_CONST", "ID",
  "CONST_ID", "'('", "')'", "';'", "'{'", "'}'", "','", "':'", "'<'",
  "'>'", "'-'", "'['", "']'", "'='", "'+'", "$accept", "esdl",
  "SectionList", "Section", "ExportDef", "EspDefExport", "EspService",
  "EspServiceStart", "EspServiceBody", "EspServiceEntryList",
  "EspServiceEntry", "EspServiceMethod", "EspServiceMount",
  "EspServiceUses", "EspStruct", "EspStructStart", "EspEnum",
  "EspEnumStart", "EnumBase", "EnumBaseType", "EnumBody", "EnumList",
  "EnumItemDef", "EnumItemBare", "OptionalComma", "EnumConstValue",
  "EspRequest", "EspRequestStart", "EspResponse", "EspResponseStart",
  "OptionalExtends", "EspMessageBody", "EspPropertyList", "EspPropertyDef",
  "OptEspEnumInit", "EspPropertyInit", "EspTemplateStart",
  "EspTemplateParams", "EspPropertyStart", "EspType", "EspMetaData",
  "EspMetaPropertyList", "EspMetaProperty", "Module", "ModuleStart",
  "ModuleVersion", "ModuleBody", "Enumeration", "EnumerationStart",
  "EnumerationBody", "EnumDefList", "EnumDef", "Api", "EspInclude",
  "EspVersionDef", "ApiStart", "ProcDefList", "ProcDef", "ProcAttr",
  "ProcAttrList", "RetParam", "ParamList", "Param", "TypeModifiers",
  "TypeModifier", "Layout", "LayoutParams", "LayoutValue", "CountVal",
  "LayoutSizeVal", "StartLayout", "String", "InOut", "StartRetParam",
  "StartParam", "SizeInfo", "IntOrId", "TypeList", "Type", "StartProc",
  "Virtual", "Abstract", "ConstFunc", "Callback", "Async", "Timeout",
  "string_const", YY_NULLPTR
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
     305,   306,   307,   308,   309,   310,   311,    40,    41,    59,
     123,   125,    44,    58,    60,    62,    45,    91,    93,    61,
      43
};
# endif

#define YYPACT_NINF -312

#define yypact_value_is_default(Yystate) \
  (!!((Yystate) == (-312)))

#define YYTABLE_NINF -138

#define yytable_value_is_error(Yytable_value) \
  0

  /* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
     STATE-NUM.  */
static const yytype_int16 yypact[] =
{
     136,     7,    17,    26,    43,    68,    36,    36,    36,    36,
      36,   100,   115,   129,    93,   136,  -312,  -312,  -312,  -312,
      99,  -312,    65,  -312,   139,  -312,    65,  -312,    65,  -312,
     146,  -312,   145,  -312,  -312,  -312,    89,  -312,   -20,   133,
    -312,  -312,   -29,   149,   151,   152,   153,   154,   155,   156,
     157,  -312,  -312,    -8,   158,   159,   160,    58,   161,   160,
     160,    71,   162,   163,   164,  -312,  -312,   167,  -312,    89,
    -312,  -312,  -312,  -312,  -312,   168,  -312,   169,   171,  -312,
     170,  -312,  -312,  -312,  -312,  -312,  -312,   172,   175,   177,
      36,    36,    36,  -312,    -1,  -312,  -312,  -312,  -312,  -312,
      89,  -312,  -312,    -4,   166,  -312,  -312,  -312,  -312,  -312,
      -3,   178,   180,   181,   183,   184,   182,   185,   147,   128,
    -312,  -312,    74,  -312,   174,   124,  -312,  -312,   186,   102,
     191,   187,   127,   188,   189,   194,   195,   179,  -312,  -312,
    -312,  -312,    30,  -312,   173,   -14,  -312,  -312,  -312,   176,
    -312,   196,  -312,  -312,  -312,  -312,  -312,  -312,   192,  -312,
    -312,   -24,  -312,   163,  -312,  -312,   190,    86,  -312,  -312,
    -312,  -312,   197,   199,   200,    83,   124,  -312,  -312,  -312,
    -312,  -312,   201,  -312,   202,   203,     3,  -312,  -312,   204,
     205,  -312,  -312,   207,   208,  -312,  -312,   211,   210,  -312,
    -312,   165,   206,   212,    28,   -21,   213,   214,  -312,  -312,
    -312,  -312,   217,  -312,    74,    87,  -312,   124,    74,    74,
    -312,  -312,  -312,  -312,  -312,  -312,  -312,  -312,  -312,  -312,
    -312,  -312,  -312,  -312,  -312,  -312,    83,  -312,  -312,  -312,
    -312,  -312,  -312,  -312,   216,   218,   221,   220,   219,    86,
      38,    38,   -22,   222,   224,   225,    83,  -312,  -312,   125,
    -312,   215,   223,    86,   226,   227,   111,  -312,   209,   -33,
    -312,  -312,  -312,   228,    48,  -312,   112,   118,   231,    83,
     148,   232,   230,   233,   234,  -312,   131,    49,  -312,   238,
     239,    83,  -312,  -312,   113,   237,  -312,  -312,  -312,  -312,
    -312,  -312,  -312,    74,  -312,  -312,   244,   245,   242,   240,
     256,   243,   246,   122,    83,   247,   150,  -312,  -312,  -312,
     248,   249,  -312,   241,   251,  -312,   220,  -312,  -312,  -312,
    -312,   252,  -312,  -312,   235,   250,   212,   254,   257,   212,
     258,  -312,  -312,  -312,   144,   255,    50,   259,   260,   261,
     262,   263,   264,   265,   266,   267,   269,    69,  -312,  -312,
    -312,  -312,  -312,   212,  -312,   268,  -312,  -312,  -312,  -312,
    -312,   271,   272,  -312,  -312
};

  /* YYDEFACT[STATE-NUM] -- Default reduction number in state STATE-NUM.
     Performed when YYTABLE does not specify something else to do.  Zero
     means the default is an error.  */
static const yytype_uint8 yydefact[] =
{
       0,     0,   121,     0,     0,     0,    93,    93,    93,    93,
      93,     0,     0,     0,     0,     2,     3,     7,     8,    14,
       0,    10,    60,    11,    37,    12,    60,    13,    60,     5,
     106,     6,     0,     9,    16,    15,   132,   102,     0,     0,
     103,   110,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     1,     4,   181,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,   188,   187,     0,   182,   132,
     159,   127,   128,   129,   130,     0,   122,     0,   100,    92,
      51,    94,    33,    35,    56,    58,    20,     0,     0,     0,
      93,    93,    93,    22,   181,    23,    25,    26,    27,    29,
     132,    19,    59,    93,     0,    38,    39,    41,    40,    36,
      93,     0,     0,     0,     0,     0,   181,     0,   116,     0,
     112,   109,     0,   131,     0,   139,   158,   123,     0,     0,
      50,     0,     0,     0,     0,     0,     0,     0,    21,    24,
     159,    62,    93,    63,     0,   159,    88,    32,    43,    51,
      44,     0,    34,    55,    57,   104,   105,   108,   181,   124,
     101,     0,   111,     0,   162,   163,     0,   159,   155,   156,
     157,   154,     0,     0,     0,     0,   139,   143,   141,   140,
     142,    17,     0,   190,     0,     0,     0,    95,    91,     0,
       0,    18,   118,     0,     0,    89,    90,     0,     0,    61,
      64,     0,     0,    84,   139,    50,     0,    49,    46,   107,
     125,   114,     0,   113,     0,     0,   134,   139,     0,     0,
     153,   179,   176,   170,   166,   168,   167,   171,   172,   169,
     173,   178,   177,   174,   175,   180,   133,   164,   138,    96,
      98,    99,   191,    97,     0,     0,     0,     0,     0,   159,
     139,   139,     0,     0,     0,     0,     0,    45,    42,     0,
     115,     0,     0,   159,     0,     0,     0,   145,   149,     0,
     165,   120,   119,     0,     0,    31,     0,     0,     0,    87,
       0,     0,     0,     0,     0,    83,     0,     0,    73,     0,
       0,   136,    52,    53,     0,    54,   189,   117,   135,   160,
     161,   144,   153,     0,   147,   150,     0,     0,     0,     0,
     186,     0,     0,     0,    86,     0,     0,    77,    81,    79,
       0,     0,    82,     0,    76,    47,     0,   146,   148,   152,
     151,     0,    30,   185,   184,     0,    84,     0,     0,    84,
       0,    78,    80,    71,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,    72,    48,
      28,   183,   126,    84,    67,     0,    69,    65,    66,    74,
      75,     0,     0,    68,    70
};

  /* YYPGOTO[NTERM-NUM].  */
static const yytype_int16 yypgoto[] =
{
    -312,  -312,  -312,   288,  -312,  -312,  -312,  -312,  -312,  -312,
     142,  -312,  -312,  -312,  -312,  -312,  -312,  -312,  -312,  -312,
    -312,  -312,    14,  -312,    81,  -312,  -312,  -312,  -312,  -312,
      47,   138,  -312,   193,  -312,  -311,  -312,    54,  -312,   -50,
      -6,  -312,   198,  -312,  -312,  -312,  -312,  -312,  -312,  -312,
    -312,   229,  -312,  -312,  -312,  -312,  -312,   -99,  -312,   -46,
     236,    67,  -139,  -120,  -312,  -312,  -312,    19,  -312,  -312,
    -312,  -312,  -312,  -312,   -51,  -312,  -207,  -232,  -226,  -312,
    -312,  -312,  -312,  -312,  -312,  -312,  -239
};

  /* YYDEFGOTO[NTERM-NUM].  */
static const yytype_int16 yydefgoto[] =
{
      -1,    14,    15,    16,    17,    18,    19,    20,    54,    94,
      95,    96,    97,    98,    21,    22,    23,    24,    58,   109,
     111,   149,   150,   208,   131,   294,    25,    26,    27,    28,
      56,   104,   142,   143,   345,   253,   144,   277,   145,   197,
     146,    80,    81,    29,    30,    62,   117,    31,    32,    64,
     119,   120,    33,    34,    35,    36,   158,    99,    69,    70,
     124,   215,   216,   256,   176,   177,   266,   267,   304,   268,
     269,   178,   179,   125,   217,   180,   166,   236,   237,   100,
      71,   349,   334,    72,    73,    74,   186
};

  /* YYTABLE[YYPACT[STATE-NUM]] -- What to do in state STATE-NUM.  If
     positive, shift that token.  If negative, reduce the rule whose
     number is the opposite.  If YYTABLE_NINF, syntax error.  */
static const yytype_int16 yytable[] =
{
      43,    44,    45,    46,    47,   175,   203,   261,   274,    90,
     270,   264,   265,   287,    91,    92,    90,   159,   305,   126,
     295,    91,    92,   123,   291,   351,    78,   211,   354,   282,
     183,   283,   284,   306,   -93,    75,   285,   307,    76,    79,
     254,   255,   212,  -137,   286,  -137,    42,   314,   -85,   -85,
     195,   196,   371,    93,   140,   242,   238,   141,   148,   210,
     138,   243,    37,    42,    42,   270,   168,   169,   170,   171,
     172,   173,   174,    59,    38,    60,   168,   169,   170,   171,
     172,   173,   174,    39,   135,   136,   137,   346,   270,   126,
     105,   199,   106,    51,   204,   107,   328,    42,    40,   108,
     242,   242,   242,    42,   151,   357,   309,   322,   359,   221,
     222,   223,   224,   225,   226,   227,   228,   229,   230,   231,
     232,   242,   114,    41,   298,   164,   115,   370,    55,   165,
     279,   279,   233,   234,    65,    66,    67,    68,   235,     1,
       2,     3,     4,     5,  -137,   262,     6,     7,  -137,   263,
       8,     9,    10,   182,   183,    11,   184,    48,   185,    53,
      12,    13,   168,   169,   170,   171,   172,   173,   174,   301,
     310,   325,    49,   302,   263,   326,   292,   183,   189,   293,
     311,   190,   320,   312,   337,   321,    50,   338,    77,   162,
     163,   195,   196,   201,   202,   356,   183,   112,   113,   151,
     278,   281,    57,    61,    82,    63,    83,    84,    85,    86,
      87,    88,    89,   315,   102,   340,   161,   101,   118,   257,
     103,   110,   116,   121,   122,   147,   127,   128,   129,   250,
     206,   167,   130,   133,   132,   134,   139,   152,   205,   153,
     154,   155,   156,   157,   160,   181,    78,   191,   192,   193,
     194,   207,   214,   209,   218,   188,   219,   220,   303,   239,
     240,   241,   244,   245,   246,   247,   248,   249,   260,   252,
     251,   259,   183,   296,   258,   271,   273,   272,   275,   289,
     290,   288,   297,   333,   299,   300,   313,   316,   317,   242,
     308,   318,   319,   323,   324,   329,   330,   331,   335,   332,
     343,   336,   339,    52,   348,   280,   341,   342,   344,   352,
     347,   361,   353,   355,   358,   350,   276,   363,   360,     0,
     362,   327,   364,   372,   366,   367,   368,   369,   187,   365,
     373,   374,     0,     0,     0,   200,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,   198,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,   213
};

static const yytype_int16 yycheck[] =
{
       6,     7,     8,     9,    10,   125,   145,   214,   247,    17,
     236,   218,   219,   252,    22,    23,    17,   116,    51,    70,
     259,    22,    23,    69,   256,   336,    55,    51,   339,    51,
      52,    53,    54,    66,    55,    55,    58,    70,    58,    68,
      12,    13,    66,    57,    66,    59,    67,   279,    20,    21,
      12,    13,   363,    61,   100,    52,   176,    61,    61,   158,
      61,    58,    55,    67,    67,   291,    38,    39,    40,    41,
      42,    43,    44,    26,    57,    28,    38,    39,    40,    41,
      42,    43,    44,    57,    90,    91,    92,   326,   314,   140,
      32,    61,    34,     0,   145,    37,   303,    67,    55,    41,
      52,    52,    52,    67,   110,   344,    58,    58,    58,    26,
      27,    28,    29,    30,    31,    32,    33,    34,    35,    36,
      37,    52,    51,    55,   263,    51,    55,    58,    63,    55,
     250,   251,    49,    50,    45,    46,    47,    48,    55,     3,
       4,     5,     6,     7,    58,    58,    10,    11,    62,    62,
      14,    15,    16,    51,    52,    19,    54,    57,    56,    60,
      24,    25,    38,    39,    40,    41,    42,    43,    44,    58,
      58,    58,    57,    62,    62,    62,    51,    52,    51,    54,
      62,    54,    51,    65,    62,    54,    57,    65,    55,    61,
      62,    12,    13,    20,    21,    51,    52,    59,    60,   205,
     250,   251,    63,    57,    55,    60,    55,    55,    55,    55,
      55,    55,    55,    65,    55,    65,    69,    59,    55,   205,
      60,    60,    60,    59,    57,    59,    58,    58,    57,    64,
     149,    57,    62,    58,    62,    58,    94,    59,    62,    59,
      59,    58,    58,    61,    59,    59,    55,    59,    59,    55,
      55,    55,    62,    61,    57,    68,    57,    57,    49,    58,
      58,    58,    58,    58,    57,    57,    55,    57,    51,    57,
      64,    57,    52,    58,    61,    59,    55,    59,    59,    55,
      55,    59,    59,    27,    58,    58,    55,    55,    58,    52,
      62,    58,    58,    55,    55,    51,    51,    55,    55,    59,
      59,    55,    55,    15,    69,   251,    58,    58,    57,    55,
      58,    51,    55,    55,    59,    65,   249,    55,    59,    -1,
      59,   302,    59,    55,    59,    59,    59,    58,   130,    65,
      59,    59,    -1,    -1,    -1,   142,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,   140,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,   163
};

  /* YYSTOS[STATE-NUM] -- The (internal number of the) accessing
     symbol of state STATE-NUM.  */
static const yytype_uint8 yystos[] =
{
       0,     3,     4,     5,     6,     7,    10,    11,    14,    15,
      16,    19,    24,    25,    72,    73,    74,    75,    76,    77,
      78,    85,    86,    87,    88,    97,    98,    99,   100,   114,
     115,   118,   119,   123,   124,   125,   126,    55,    57,    57,
      55,    55,    67,   111,   111,   111,   111,   111,    57,    57,
      57,     0,    74,    60,    79,    63,   101,    63,    89,   101,
     101,    57,   116,    60,   120,    45,    46,    47,    48,   129,
     130,   151,   154,   155,   156,    55,    58,    55,    55,    68,
     112,   113,    55,    55,    55,    55,    55,    55,    55,    55,
      17,    22,    23,    61,    80,    81,    82,    83,    84,   128,
     150,    59,    55,    60,   102,    32,    34,    37,    41,    90,
      60,    91,   102,   102,    51,    55,    60,   117,    55,   121,
     122,    59,    57,   130,   131,   144,   145,    58,    58,    57,
      62,    95,    62,    58,    58,   111,   111,   111,    61,    81,
     130,    61,   103,   104,   107,   109,   111,    59,    61,    92,
      93,   111,    59,    59,    59,    58,    58,    61,   127,   128,
      59,    69,    61,    62,    51,    55,   147,    57,    38,    39,
      40,    41,    42,    43,    44,   134,   135,   136,   142,   143,
     146,    59,    51,    52,    54,    56,   157,   113,    68,    51,
      54,    59,    59,    55,    55,    12,    13,   110,   131,    61,
     104,    20,    21,   133,   145,    62,    95,    55,    94,    61,
     128,    51,    66,   122,    62,   132,   133,   145,    57,    57,
      57,    26,    27,    28,    29,    30,    31,    32,    33,    34,
      35,    36,    37,    49,    50,    55,   148,   149,   134,    58,
      58,    58,    52,    58,    58,    58,    57,    57,    55,    57,
      64,    64,    57,   106,    12,    13,   134,    93,    61,    57,
      51,   147,    58,    62,   147,   147,   137,   138,   140,   141,
     149,    59,    59,    55,   157,    59,   132,   108,   110,   134,
     108,   110,    51,    53,    54,    58,    66,   157,    59,    55,
      55,   148,    51,    54,    96,   157,    58,    59,   133,    58,
      58,    58,    62,    49,   139,    51,    66,    70,    62,    58,
      58,    62,    65,    55,   148,    65,    55,    58,    58,    58,
      51,    54,    58,    55,    55,    58,    62,   138,   147,    51,
      51,    55,    59,    27,   153,    55,    55,    62,    65,    55,
      65,    58,    58,    59,    57,   105,   157,    58,    69,   152,
      65,   106,    55,    55,   106,    55,    51,   157,    59,    58,
      59,    51,    59,    55,    59,    65,    59,    59,    59,    58,
      58,   106,    55,    59,    59
};

  /* YYR1[YYN] -- Symbol number of symbol that rule YYN derives.  */
static const yytype_uint8 yyr1[] =
{
       0,    71,    72,    73,    73,    74,    74,    74,    74,    74,
      74,    74,    74,    74,    74,    74,    74,    75,    76,    77,
      78,    79,    79,    80,    80,    81,    81,    81,    82,    82,
      83,    84,    85,    86,    87,    88,    89,    89,    90,    90,
      90,    90,    91,    91,    92,    92,    93,    94,    94,    94,
      95,    95,    96,    96,    96,    97,    98,    99,   100,   101,
     101,   102,   102,   103,   103,   104,   104,   104,   104,   104,
     104,   104,   104,   104,   105,   105,   105,   106,   106,   106,
     106,   106,   106,   106,   106,   107,   108,   108,   109,   110,
     110,   111,   111,   111,   112,   112,   113,   113,   113,   113,
     113,   114,   115,   115,   116,   116,   116,   117,   117,   118,
     119,   120,   121,   121,   122,   122,   122,   123,   124,   125,
     125,   126,   126,   126,   127,   127,   128,   129,   129,   129,
     129,   130,   130,   131,   132,   132,   133,   133,   134,   134,
     135,   135,   135,   135,   136,   137,   137,   138,   139,   139,
     140,   140,   140,   141,   142,   143,   143,   143,   144,   145,
     146,   146,   147,   147,   148,   148,   149,   149,   149,   149,
     149,   149,   149,   149,   149,   149,   149,   149,   149,   149,
     149,   150,   151,   152,   152,   153,   153,   154,   155,   156,
     157,   157
};

  /* YYR2[YYN] -- Number of symbols on the right hand side of rule YYN.  */
static const yytype_uint8 yyr2[] =
{
       0,     2,     1,     1,     2,     1,     1,     1,     1,     1,
       1,     1,     1,     1,     1,     1,     1,     5,     5,     3,
       3,     3,     2,     1,     2,     1,     1,     1,     9,     1,
       7,     5,     4,     3,     4,     3,     2,     0,     1,     1,
       1,     1,     4,     2,     1,     3,     2,     4,     6,     1,
       1,     0,     1,     1,     1,     4,     3,     4,     3,     2,
       0,     3,     2,     1,     2,     8,     8,     8,    10,     8,
      10,     6,     7,     4,     3,     3,     0,     3,     4,     3,
       4,     3,     3,     2,     0,     2,     2,     1,     1,     1,
       1,     4,     2,     0,     1,     3,     4,     4,     4,     4,
       1,     4,     2,     2,     3,     3,     0,     3,     2,     3,
       2,     3,     1,     3,     3,     4,     1,     7,     5,     7,
       7,     1,     3,     4,     1,     2,     9,     1,     1,     1,
       1,     2,     0,     3,     1,     3,     3,     0,     2,     0,
       1,     1,     1,     1,     4,     1,     3,     2,     2,     0,
       2,     3,     3,     0,     1,     1,     1,     1,     1,     0,
       4,     4,     1,     1,     1,     2,     1,     1,     1,     1,
       1,     1,     1,     1,     1,     1,     1,     1,     1,     1,
       1,     0,     1,     2,     0,     1,     0,     1,     1,     6,
       1,     2
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
        case 17:
#line 164 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    ExportDefInfo edi((yyvsp[-2]).getName());
 }
#line 1624 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 18:
#line 171 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    esp_def_export_tag=strdup((yyvsp[-2]).getName());
 }
#line 1632 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 19:
#line 178 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddEspService();
    //Now the default is sorted
    if (CurService->getMetaInt("sort_method",1)!=0)
        CurService->sortMethods();
    CurService=NULL;
 }
#line 1644 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 20:
#line 189 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurService=new EspServInfo((yyvsp[0]).getName());
    if (CurService)
    {
        CurService->tags = getClearCurMetaTags();

        StringBuffer minPingVer;
        for (MetaTagInfo* t = CurService->tags; t!=NULL; t = t->next)
        {
            if (streq("ping_min_ver",t->getName()))
            {
                minPingVer.set(t->getString());
                break;
            }
        }

        VStringBuffer reqname("%sPingRequest", (yyvsp[0]).getName());
        CurEspMessage = new EspMessageInfo(reqname.str(), EspMessageInfo::espm_request);

        if(minPingVer.length()!=0)
        {
            CurMetaTags = NULL;
            AddMetaTag(new MetaTagInfo("min_ver", minPingVer.str()));
            CurEspMessage->tags = getClearCurMetaTags();
         }

        AddEspMessage();
        CurEspMessage=NULL;

        VStringBuffer respname("%sPingResponse", (yyvsp[0]).getName());
        CurEspMessage = new EspMessageInfo(respname.str(), EspMessageInfo::espm_response);

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
#line 1706 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 28:
#line 266 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    EspMethodInfo *method=new EspMethodInfo((yyvsp[-6]).getName(), (yyvsp[-4]).getName(), (yyvsp[-2]).getName());
    method->tags = getClearCurMetaTags();
    method->next=CurService->methods;
    CurService->methods=method;
 }
#line 1717 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 29:
#line 273 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    if (CurService && CurProc)
    {
        CurEspMessage = new EspMessageInfo(EspMessageInfo::espm_request, CurProc);
        AddEspMessage();
        CurEspMessage=NULL;

        CurEspMessage = new EspMessageInfo(EspMessageInfo::espm_response, CurProc);
        AddEspMessage();
        CurEspMessage=NULL;

        EspMethodInfo *method=new EspMethodInfo(CurProc);
        delete CurProc;
        CurProc=NULL;

        method->next=CurService->methods;
        CurService->methods=method;
    }
    else if (CurProc)
    {
        CurEspMessage = new EspMessageInfo(EspMessageInfo::espm_request, CurProc);
        AddEspMessage();
        CurEspMessage=NULL;

        CurEspMessage = new EspMessageInfo(EspMessageInfo::espm_response, CurProc);
        AddEspMessage();
        CurEspMessage=NULL;

        EspMethodInfo *CurMethod=new EspMethodInfo(CurProc);
        delete CurProc;
        CurProc=NULL;

        AddEspMethod();
        CurMethod=NULL;
    }
 }
#line 1758 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 30:
#line 313 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    EspMountInfo *mount=new EspMountInfo((yyvsp[-4]).getName(), (yyvsp[-2]).getString());

    mount->tags = getClearCurMetaTags();

    mount->next=CurService->mounts;
    CurService->mounts=mount;
 }
#line 1771 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 31:
#line 325 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    EspStructInfo *esp_struct=new EspStructInfo((yyvsp[-1]).getName());

    esp_struct->tags = getClearCurMetaTags();

    esp_struct->next=CurService->structs;
    CurService->structs=esp_struct;
 }
#line 1784 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 32:
#line 337 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddEspMessage();
    CurEspMessage=NULL;
 }
#line 1793 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 33:
#line 345 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurEspMessage = new EspMessageInfo((yyvsp[0]).getName(), EspMessageInfo::espm_struct);
    CurEspMessage->tags = getClearCurMetaTags();
    CurParam=NULL;
 }
#line 1803 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 34:
#line 356 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddEspMessage();
    CurEspMessage=NULL;
 }
#line 1812 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 35:
#line 364 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurEspMessage = new EspMessageInfo((yyvsp[0]).getName(), EspMessageInfo::espm_enum);
    CurEspMessage->tags = getClearCurMetaTags();
    CurParam=NULL;
 }
#line 1822 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 36:
#line 373 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    if (CurEspMessage->getParentName())
        yyerror("parent is already specified by meta extends");
    CurEspMessage->setParentName((yyvsp[0]).getName());
 }
#line 1832 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 37:
#line 379 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    yyerror("base type must be specified for enumeration type");
 }
#line 1840 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 38:
#line 386 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    (yyval).setName("int");
 }
#line 1848 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 39:
#line 390 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    (yyval).setName("short");
 }
#line 1856 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 40:
#line 394 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    (yyval).setName("string");
 }
#line 1864 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 41:
#line 398 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    (yyval).setName("double");
 }
#line 1872 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 42:
#line 405 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurParam=NULL;
    LastParam=NULL;
 }
#line 1881 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 43:
#line 410 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {  yyerror("Enum can not be empty");  }
#line 1887 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 47:
#line 424 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurParam = new ParamInfo;
    CurParam->name = strdup((yyvsp[-3]).getName());
    CurParam->kind = TK_ENUM;
    CurParam->tags = getClearCurMetaTags();
    AddEspProperty();
 }
#line 1899 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 48:
#line 432 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurParam = new ParamInfo;
    CurParam->name = strdup((yyvsp[-5]).getName());
    CurParam->kind = TK_ENUM;
    AddMetaTag(new MetaTagInfo("desc", (yyvsp[-1]).getString()));
    CurParam->tags = getClearCurMetaTags();;
    AddEspProperty();
 }
#line 1912 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 49:
#line 441 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurParam = new ParamInfo;
    CurParam->name = strdup((yyvsp[0]).getName());
    CurParam->kind = TK_ENUM;
    AddMetaTag(new MetaTagInfo("enum", VStringBuffer("\"%s\"", (yyvsp[0]).getName()).str()));
    CurParam->tags = getClearCurMetaTags();

    AddEspProperty();
 }
#line 1926 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 52:
#line 459 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    int val = (yyvsp[0]).getInt();
    AddMetaTag(new MetaTagInfo("enum", val));
 }
#line 1935 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 53:
#line 464 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    double val = (yyvsp[0]).getDouble();
    AddMetaTag(new MetaTagInfo("enum", val));
 }
#line 1944 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 54:
#line 469 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    const char* val = (yyvsp[0]).getString();
    AddMetaTag(new MetaTagInfo("enum", val));
 }
#line 1953 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 55:
#line 477 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddEspMessage();
    CurEspMessage=NULL;
 }
#line 1962 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 56:
#line 485 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurEspMessage = new EspMessageInfo((yyvsp[0]).getName(), EspMessageInfo::espm_request);
    CurEspMessage->tags = getClearCurMetaTags();
    CurParam=NULL;
 }
#line 1972 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 57:
#line 495 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddEspMessage();
    CurEspMessage=NULL;
 }
#line 1981 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 58:
#line 503 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurEspMessage = new EspMessageInfo((yyvsp[0]).getName(), EspMessageInfo::espm_response);
    CurEspMessage->tags = getClearCurMetaTags();
    CurParam=NULL;
 }
#line 1991 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 59:
#line 512 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    if (CurEspMessage->getParentName())
        yyerror("parent is already specified by meta extends");
    CurEspMessage->setParentName((yyvsp[0]).getName());
 }
#line 2001 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 61:
#line 522 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurParam=NULL;
    LastParam=NULL;
 }
#line 2010 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 65:
#line 536 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2041 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 66:
#line 563 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2060 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 67:
#line 578 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2091 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 68:
#line 605 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2125 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 69:
#line 635 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2144 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 70:
#line 650 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2166 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 71:
#line 668 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2181 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 72:
#line 679 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2196 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 73:
#line 690 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2214 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 74:
#line 707 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo("default", (yyvsp[-1]).getInt()));
 }
#line 2222 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 75:
#line 711 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo("default", (yyvsp[-1]).getString()));
 }
#line 2230 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 76:
#line 715 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
 }
#line 2237 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 77:
#line 721 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    int val = (yyvsp[-1]).getInt();
    AddMetaTag(new MetaTagInfo("default", val));
 }
#line 2246 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 78:
#line 726 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    int val = -(yyvsp[-1]).getInt();
    AddMetaTag(new MetaTagInfo("default", val));
 }
#line 2255 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 79:
#line 731 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    double val = (yyvsp[0]).getDouble();
    AddMetaTag(new MetaTagInfo("default", val));
 }
#line 2264 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 80:
#line 736 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    double val = -(yyvsp[-1]).getDouble();
    AddMetaTag(new MetaTagInfo("default", val));
 }
#line 2273 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 81:
#line 741 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo("default", (yyvsp[-1]).getInt()));
 }
#line 2281 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 82:
#line 745 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo("default", (yyvsp[-1]).getString()));
 }
#line 2289 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 83:
#line 749 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo("default", 0));
 }
#line 2297 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 84:
#line 753 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    //AddMetaTag(new MetaTagInfo("default", 0));
 }
#line 2305 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 86:
#line 764 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
 }
#line 2312 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 87:
#line 767 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
 }
#line 2319 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 90:
#line 794 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {  CurParam->kind = TK_ESPENUM; }
#line 2325 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 96:
#line 811 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo((yyvsp[-3]).getName(), (yyvsp[-1]).getInt()));
 }
#line 2333 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 97:
#line 815 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo((yyvsp[-3]).getName(), (yyvsp[-1]).getString()));
 }
#line 2341 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 98:
#line 819 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo((yyvsp[-3]).getName(), (yyvsp[-1]).getDouble()));
 }
#line 2349 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 99:
#line 823 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo((yyvsp[-3]).getName(), (yyvsp[-1]).getName(),true));
 }
#line 2357 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 100:
#line 827 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddMetaTag(new MetaTagInfo((yyvsp[0]).getName(), 1));
 }
#line 2365 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 101:
#line 835 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddModule();
    CurModule = NULL;
 }
#line 2374 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 102:
#line 844 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurModule = new ModuleInfo((yyvsp[0]).getName());
   LastProc = NULL;
 }
#line 2383 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 103:
#line 849 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurModule = new ModuleInfo((yyvsp[0]).getName());
   CurModule->isSCMinterface = true;
   LastProc = NULL;
 }
#line 2393 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 104:
#line 859 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurModule->version = (yyvsp[-1]).getInt();
   if ((CurModule->version>255)||(CurModule->version<0))
   {
        errnum = 5;
        yyerror("version must be in range 0-255");
   }
 }
#line 2406 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 105:
#line 868 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurModule->base = strdup((yyvsp[-1]).getName());
 }
#line 2414 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 109:
#line 882 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    AddEnum();
    CurEnum = NULL;
 }
#line 2423 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 110:
#line 891 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   EnumValue = 0;
   CurEnum = new EnumInfo((yyvsp[0]).getName());
   LastEnumVal = NULL;
 }
#line 2433 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 112:
#line 905 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2448 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 113:
#line 916 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   if (CurEnumVal)
   {
     LastEnumVal->next = CurEnumVal;
     LastEnumVal = CurEnumVal;
   }
 }
#line 2460 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 114:
#line 927 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    EnumValue = (yyvsp[0]).getInt();
    CurEnumVal = new EnumValInfo((yyvsp[-2]).getName(),EnumValue);
    EnumValue++;
 }
#line 2470 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 115:
#line 933 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    EnumValue = - (yyvsp[0]).getInt();
    CurEnumVal = new EnumValInfo((yyvsp[-3]).getName(),EnumValue);
    EnumValue++;
 }
#line 2480 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 116:
#line 939 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurEnumVal = new EnumValInfo((yyvsp[0]).getName(),EnumValue);
    EnumValue++;
 }
#line 2489 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 117:
#line 948 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   if (CurApi)
   {
      CurApi->proc = CurProc;
       AddApi();

       CurApi = NULL;
      CurProc = NULL;
      LastParam = NULL;
   }
 }
#line 2505 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 118:
#line 963 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurInclude = new IncludeInfo((yyvsp[-2]).getName());
     if (LastInclude)
       LastInclude->next = CurInclude;
     else
       hcp->includes = CurInclude;
     LastInclude = CurInclude;
 }
#line 2518 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 119:
#line 975 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    VersionInfo *prev = hcp->versions;
    hcp->versions = new VersionInfo((yyvsp[-4]).getName(), (yyvsp[-2]).getDouble());
    hcp->versions->next = prev;
 }
#line 2528 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 120:
#line 981 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    VersionInfo *prev = hcp->versions;
    hcp->versions = new VersionInfo((yyvsp[-4]).getName(), (yyvsp[-2]).getInt());
    hcp->versions->next = prev;
 }
#line 2538 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 121:
#line 990 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurApi = new ApiInfo(hcp->getPackageName());
   CurProc = new ProcInfo();
    CurModule = NULL;
   LastProc = NULL;
 }
#line 2549 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 122:
#line 997 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurApi = new ApiInfo(hcp->getPackageName());
   CurProc = new ProcInfo();
    CurModule = NULL;
   LastProc = NULL;
 }
#line 2560 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 123:
#line 1004 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurApi = new ApiInfo((yyvsp[-1]).getName());
   CurProc = new ProcInfo();
    CurModule = NULL;
   LastProc = NULL;
 }
#line 2571 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 124:
#line 1015 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2586 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 125:
#line 1026 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   if (CurProc)
   {
     LastProc->next = CurProc;
     LastProc = CurProc;
   }
 }
#line 2598 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 126:
#line 1037 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   LastParam = NULL;
 }
#line 2606 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 133:
#line 1056 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    if (CurParam)
   {
     if (CurProc->async && CurParam)
     {
       errnum = 6;
       yyerror("Return not allowed");
     }
     CurProc->name = CurParam->name;
     CurParam->name = strdup(RETURNNAME);
   }
   CurProc->rettype = CurParam;
   CurParam = NULL;
 }
#line 2625 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 134:
#line 1074 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   if (LastParam)
     LastParam->next = CurParam;
   else
     CurProc->params = CurParam;
   LastParam = CurParam;
 }
#line 2637 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 135:
#line 1082 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   LastParam->next = CurParam;
   LastParam = CurParam;
 }
#line 2646 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 136:
#line 1090 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   if ((CurParam->flags&(PF_IN|PF_OUT))==0)
     CurParam->flags |= PF_IN;
 }
#line 2655 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 137:
#line 1095 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   //There was no Param, make sure CurParam is nulled out
   CurParam = NULL;
 }
#line 2664 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 144:
#line 1115 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   LastLayout = NULL;
 }
#line 2672 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 145:
#line 1122 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   if (LastLayout)
     LastLayout->next = CurLayout;
   else
     CurParam->layouts = CurLayout;
   LastLayout = CurLayout;
 }
#line 2684 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 146:
#line 1130 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   LastLayout->next = CurLayout;
   LastLayout = CurLayout;
 }
#line 2693 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 148:
#line 1142 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurLayout->count = strdup((yyvsp[0]).getName());
 }
#line 2701 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 150:
#line 1150 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurLayout->size = strdup((yyvsp[0]).getName());
 }
#line 2709 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 151:
#line 1154 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurLayout->size = strdup((yyvsp[0]).getName());
 }
#line 2717 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 152:
#line 1158 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurLayout->size = (char*)malloc(strlen((yyvsp[0]).getName())+2);
   strcpy(CurLayout->size, "-");
   strcat(CurLayout->size, (yyvsp[0]).getName());
 }
#line 2727 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 153:
#line 1167 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurLayout = new LayoutInfo;
 }
#line 2735 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 154:
#line 1174 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurParam->flags |= PF_STRING;
    CurParam->setXsdType((yyvsp[0]).getName());
 }
#line 2744 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 155:
#line 1183 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurParam->flags |= PF_IN;
 }
#line 2752 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 156:
#line 1187 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurParam->flags |= PF_OUT;
 }
#line 2760 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 157:
#line 1191 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurParam->flags |= (PF_IN|PF_OUT);
 }
#line 2768 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 158:
#line 1198 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   rettype = true;
 }
#line 2776 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 159:
#line 1205 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurParam = new ParamInfo;
   rettype = false;
 }
#line 2785 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 160:
#line 1213 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurParam->flags |= PF_VARSIZE;
   CurParam->size = strdup((yyvsp[-1]).getName());
 }
#line 2794 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 161:
#line 1218 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurParam->flags |= PF_VARSIZE;
   CurParam->sizebytes = strdup((yyvsp[-1]).getName());
 }
#line 2803 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 162:
#line 1226 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   (yyval).setNameF("%d", (yyvsp[0]).getInt());
 }
#line 2811 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 163:
#line 1230 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   (yyval).setName((yyvsp[0]).getName());
 }
#line 2819 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 166:
#line 1242 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2840 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 167:
#line 1259 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2858 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 168:
#line 1273 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2876 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 169:
#line 1287 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2897 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 170:
#line 1304 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurParam->kind = TK_VOID;
 }
#line 2905 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 171:
#line 1308 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2931 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 172:
#line 1330 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2949 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 173:
#line 1344 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2976 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 174:
#line 1367 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 2992 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 175:
#line 1379 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 3008 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 176:
#line 1391 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurParam->flags |= PF_CONST;
 }
#line 3016 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 177:
#line 1395 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 3034 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 178:
#line 1409 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
#line 3052 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 179:
#line 1423 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurParam->setXsdType((yyvsp[0]).getName());
 }
#line 3060 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 180:
#line 1427 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
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
         CurParam->typname = CurParam->name;
       }
       else
       {
         errnum = 9;
         yyerror("unknown/unexpected ID");
       }
     }
     CurParam->name = strdup((yyvsp[0]).getName());
   }
 }
#line 3108 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 181:
#line 1475 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurProc = new ProcInfo();
   if (CurModule!=NULL && CurModule->isSCMinterface)
      CurProc->virt = 2;
 }
#line 3118 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 182:
#line 1484 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   if (CurProc->virt==0)
      CurProc->virt = 1;
 }
#line 3127 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 183:
#line 1492 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   if (CurProc->virt && ((yyvsp[0]).getInt()==0))
     CurProc->virt = 2;
   else
   {
     errnum = 10;
     yyerror("abstract not allowed on non-virtual");
   }
 }
#line 3141 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 185:
#line 1506 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurProc->constfunc = 1;
 }
#line 3149 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 187:
#line 1514 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurProc->callback = 1;
 }
#line 3157 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 188:
#line 1521 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
   CurProc->async = 1;
 }
#line 3165 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 189:
#line 1528 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
    CurProc->conntimeout = strdup((yyvsp[-3]).getName());
    CurProc->calltimeout = strdup((yyvsp[-1]).getName());
 }
#line 3174 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;

  case 191:
#line 1537 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1646  */
    {
     int len1 = strlen((yyvsp[-1]).getString());
     int len2 = strlen((yyvsp[0]).getString());
     char* s = (char*)malloc(len1+len2+1);
     memcpy(s, (yyvsp[-1]).getString(), len1);
     memcpy(s+len1, (yyvsp[0]).getString(), len2+1);
     (yyval).setVal(s);
 }
#line 3187 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
    break;


#line 3191 "/home/sathvik/hpcc/HPCC-Platform/build/tools/esdlcomp/esdlgram.cpp" /* yacc.c:1646  */
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
#line 1549 "/home/sathvik/hpcc/HPCC-Platform/tools/esdlcomp/esdlgram.y" /* yacc.c:1906  */


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

void CheckEspProperty()
{
    if(!CurParam)
        return;
    StringArray ErrMsgs;
    bool hasDup = CurParam->checkDup(ErrMsgs, CurEspMessage->getParams());
    if(hasDup)
    {
        ForEachItemIn(i, ErrMsgs)
        {
            errnum = 11;
            VStringBuffer ErrMsg("Warning: %s", ErrMsgs.item(i));
            yyerror(ErrMsg.str());
        }
    }
}

void AddEspProperty()
{
    if (CurParam)
    {
        CheckEspProperty();
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

void AddEspMethod()
{
    if (CurMethod)
    {
        if (LastMethod)
            LastMethod->next = CurMethod;
        else
            hcp->methods = CurMethod;
        LastMethod = CurMethod;
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
            VStringBuffer msg("Attribute '%s' are declared more than once", t->getName());
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

void yyCleanupESDLGlobals()
{
//These global pointers, have been assigned to the esdlcompiler 'hcp' member vars
//The compiler is responsible for releasing memory allocated.

    hcp = NULL;
    CurModule=NULL;
    CurProc=NULL;
    CurParam=NULL;
    CurLayout=NULL;
    CurEnum=NULL;
    CurEnumVal=NULL;
    CurApi=NULL;
    CurInclude = NULL;
    CurEspMessage=NULL;
    CurService=NULL;
    CurMethod=NULL;
    CurMetaTags=NULL;
    LastModule=NULL;
    LastProc=NULL;
    LastParam=NULL;
    LastLayout=NULL;
    LastEnum=NULL;
    LastEnumVal=NULL;
    LastApi=NULL;
    LastInclude=NULL;
    LastEspMessage=NULL;
    LastService=NULL;
    LastMethod=NULL;
}

void yyInitESDLGlobals(ESDLcompiler * esdlcompiler)
{
    hcp = esdlcompiler;

    EnumValue = 0;
    esp_def_export_tag=NULL;

    linenum=1;
    errnum=0;
    nCommentStartLine = -1;
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
    fprintf(stderr, "%s(%d) : syntax error H%d : %s near \"%s\"\n",hcp->filename, linenum, errnum, s, yytext);
    outf("*** %s(%d) syntax error H%d : %s near \"%s\"\n",hcp->filename, linenum, errnum, s, yytext);
    errnum = 0;
}

void check_param(void)
{
    if ((CurParam->flags&PF_PTR)&&(CurParam->kind==TK_CHAR))
        CurParam->flags |= PF_STRING;
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

