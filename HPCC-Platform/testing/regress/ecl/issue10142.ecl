/*##############################################################################

    HPCC SYSTEMS software Copyright (C) 2014 HPCC Systems®.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
############################################################################## */

IMPORT STD;
import $.setup;
prefix := setup.Files(false, false).QueryFilePrefix;

sf1 := prefix + 'test_sf';
path1 := prefix + 'sf_name1';
path2 := prefix + 'sf_name2';

nRecord := RECORD
    STRING20 name;
END;
ds1 := DATASET([
        {'aaa'},
        {'bbb'},
        {'ccc'}
    ],
    nRecord);

ds2 := DATASET([
        {'ddd'}
    ], nRecord);

IF(STD.File.SuperFileExists(sf1), STD.File.ClearSuperFile(sf1), STD.File.CreateSuperFile(sf1));

string trimmedLogicalFilename(STRING filename) := FUNCTION
    return std.str.FindReplace(std.str.ToLowerCase(trim(filename)), setup.Files(false, false).QueryFilePrefixId, '');
end;


ds3 := DATASET(sf1, {nRecord, string255 logicalFile{virtual(logicalfilename)}}, THOR);
ds4 := DATASET(path1, {nRecord, string255 logicalFile{virtual(logicalfilename)}}, THOR);

SEQUENTIAL(
    // create
    OUTPUT(ds1,,path1, OVERWRITE),
    OUTPUT(ds2,,path2, OVERWRITE),
    STD.File.StartSuperFileTransaction(),
    STD.File.AddSuperFile(sf1, path1),
    STD.File.AddSuperFile(sf1, path2),
    STD.File.FinishSuperFileTransaction(),

    OUTPUT(PROJECT(ds3, TRANSFORM(RECORDOF(ds3), SELF.logicalFile := trimmedLogicalFilename(LEFT.logicalFile); SELF := LEFT))),
    OUTPUT(PROJECT(ds4, TRANSFORM(RECORDOF(ds4), SELF.logicalFile := trimmedLogicalFilename(LEFT.logicalFile); SELF := LEFT))),
//    OUTPUT(FETCH(ds4, ds2, 0)); Gives internal error in compiler.

    // clean-up
    STD.File.StartSuperFileTransaction(),
    STD.File.RemoveSuperFile(sf1, path2),
    STD.File.RemoveSuperFile(sf1, path1),
    STD.File.FinishSuperFileTransaction(),
    STD.File.DeleteSuperFile(sf1)
    );
