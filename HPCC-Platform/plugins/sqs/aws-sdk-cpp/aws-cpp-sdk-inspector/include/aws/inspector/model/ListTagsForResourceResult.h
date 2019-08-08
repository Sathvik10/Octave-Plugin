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
#include <aws/inspector/Inspector_EXPORTS.h>
#include <aws/core/utils/memory/stl/AWSVector.h>
#include <aws/inspector/model/Tag.h>
#include <utility>

namespace Aws
{
template<typename RESULT_TYPE>
class AmazonWebServiceResult;

namespace Utils
{
namespace Json
{
  class JsonValue;
} // namespace Json
} // namespace Utils
namespace Inspector
{
namespace Model
{
  class AWS_INSPECTOR_API ListTagsForResourceResult
  {
  public:
    ListTagsForResourceResult();
    ListTagsForResourceResult(const AmazonWebServiceResult<Aws::Utils::Json::JsonValue>& result);
    ListTagsForResourceResult& operator=(const AmazonWebServiceResult<Aws::Utils::Json::JsonValue>& result);

    /**
     * <p>A collection of key and value pairs.</p>
     */
    inline const Aws::Vector<Tag>& GetTagList() const{ return m_tagList; }

    /**
     * <p>A collection of key and value pairs.</p>
     */
    inline void SetTagList(const Aws::Vector<Tag>& value) { m_tagList = value; }

    /**
     * <p>A collection of key and value pairs.</p>
     */
    inline void SetTagList(Aws::Vector<Tag>&& value) { m_tagList = std::move(value); }

    /**
     * <p>A collection of key and value pairs.</p>
     */
    inline ListTagsForResourceResult& WithTagList(const Aws::Vector<Tag>& value) { SetTagList(value); return *this;}

    /**
     * <p>A collection of key and value pairs.</p>
     */
    inline ListTagsForResourceResult& WithTagList(Aws::Vector<Tag>&& value) { SetTagList(std::move(value)); return *this;}

    /**
     * <p>A collection of key and value pairs.</p>
     */
    inline ListTagsForResourceResult& AddTagList(const Tag& value) { m_tagList.push_back(value); return *this; }

    /**
     * <p>A collection of key and value pairs.</p>
     */
    inline ListTagsForResourceResult& AddTagList(Tag&& value) { m_tagList.push_back(std::move(value)); return *this; }

  private:
    Aws::Vector<Tag> m_tagList;
  };

} // namespace Model
} // namespace Inspector
} // namespace Aws
