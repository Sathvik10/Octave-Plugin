﻿/*
* Copyright 2010-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License").
* You may not use this file except in compliance with the License.
* A copy of the License is located at
*
*  http://aws.amazon.com/apache2.0
*
* or in the "license" file accompanying this file. This file is distributed
* on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
* express or implied. See the License for the specific language governing
* permissions and limitations under the License.
*/

#pragma once
#include <aws/redshift/Redshift_EXPORTS.h>
#include <aws/redshift/model/TableRestoreStatus.h>
#include <aws/redshift/model/ResponseMetadata.h>
#include <utility>

namespace Aws
{
template<typename RESULT_TYPE>
class AmazonWebServiceResult;

namespace Utils
{
namespace Xml
{
  class XmlDocument;
} // namespace Xml
} // namespace Utils
namespace Redshift
{
namespace Model
{
  class AWS_REDSHIFT_API RestoreTableFromClusterSnapshotResult
  {
  public:
    RestoreTableFromClusterSnapshotResult();
    RestoreTableFromClusterSnapshotResult(const AmazonWebServiceResult<Aws::Utils::Xml::XmlDocument>& result);
    RestoreTableFromClusterSnapshotResult& operator=(const AmazonWebServiceResult<Aws::Utils::Xml::XmlDocument>& result);

    
    inline const TableRestoreStatus& GetTableRestoreStatus() const{ return m_tableRestoreStatus; }

    
    inline void SetTableRestoreStatus(const TableRestoreStatus& value) { m_tableRestoreStatus = value; }

    
    inline void SetTableRestoreStatus(TableRestoreStatus&& value) { m_tableRestoreStatus = std::move(value); }

    
    inline RestoreTableFromClusterSnapshotResult& WithTableRestoreStatus(const TableRestoreStatus& value) { SetTableRestoreStatus(value); return *this;}

    
    inline RestoreTableFromClusterSnapshotResult& WithTableRestoreStatus(TableRestoreStatus&& value) { SetTableRestoreStatus(std::move(value)); return *this;}

    
    inline const ResponseMetadata& GetResponseMetadata() const{ return m_responseMetadata; }

    
    inline void SetResponseMetadata(const ResponseMetadata& value) { m_responseMetadata = value; }

    
    inline void SetResponseMetadata(ResponseMetadata&& value) { m_responseMetadata = std::move(value); }

    
    inline RestoreTableFromClusterSnapshotResult& WithResponseMetadata(const ResponseMetadata& value) { SetResponseMetadata(value); return *this;}

    
    inline RestoreTableFromClusterSnapshotResult& WithResponseMetadata(ResponseMetadata&& value) { SetResponseMetadata(std::move(value)); return *this;}

  private:
    TableRestoreStatus m_tableRestoreStatus;
    ResponseMetadata m_responseMetadata;
  };

} // namespace Model
} // namespace Redshift
} // namespace Aws