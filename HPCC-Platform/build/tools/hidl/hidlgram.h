/* A Bison parser, made by GNU Bison 3.0.4.  */

/* Bison interface for Yacc-like parsers in C

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
