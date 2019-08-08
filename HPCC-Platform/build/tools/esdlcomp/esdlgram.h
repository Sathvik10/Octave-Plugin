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
