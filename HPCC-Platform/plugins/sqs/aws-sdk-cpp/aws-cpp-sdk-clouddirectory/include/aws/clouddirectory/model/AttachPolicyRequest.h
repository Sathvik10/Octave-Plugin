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
#include <aws/clouddirectory/CloudDirectory_EXPORTS.h>
#include <aws/clouddirectory/CloudDirectoryRequest.h>
#include <aws/core/utils/memory/stl/AWSString.h>
#include <aws/clouddirectory/model/ObjectReference.h>
#include <utility>

namespace Aws
{
namespace CloudDirectory
{
namespace Model
{

  /**
   */
  class AWS_CLOUDDIRECTORY_API AttachPolicyRequest : public CloudDirectoryRequest
  {
  public:
    AttachPolicyRequest();
    Aws::String SerializePayload() const override;

    Aws::Http::HeaderValueCollection GetRequestSpecificHeaders() const override;


    /**
     * <p>ARN associated with the <a>Directory</a> where both objects reside. For more
     * information, see <a>arns</a>.</p>
     */
    inline const Aws::String& GetDirectoryArn() const{ return m_directoryArn; }

    /**
     * <p>ARN associated with the <a>Directory</a> where both objects reside. For more
     * information, see <a>arns</a>.</p>
     */
    inline void SetDirectoryArn(const Aws::String& value) { m_directoryArnHasBeenSet = true; m_directoryArn = value; }

    /**
     * <p>ARN associated with the <a>Directory</a> where both objects reside. For more
     * information, see <a>arns</a>.</p>
     */
    inline void SetDirectoryArn(Aws::String&& value) { m_directoryArnHasBeenSet = true; m_directoryArn = std::move(value); }

    /**
     * <p>ARN associated with the <a>Directory</a> where both objects reside. For more
     * information, see <a>arns</a>.</p>
     */
    inline void SetDirectoryArn(const char* value) { m_directoryArnHasBeenSet = true; m_directoryArn.assign(value); }

    /**
     * <p>ARN associated with the <a>Directory</a> where both objects reside. For more
     * information, see <a>arns</a>.</p>
     */
    inline AttachPolicyRequest& WithDirectoryArn(const Aws::String& value) { SetDirectoryArn(value); return *this;}

    /**
     * <p>ARN associated with the <a>Directory</a> where both objects reside. For more
     * information, see <a>arns</a>.</p>
     */
    inline AttachPolicyRequest& WithDirectoryArn(Aws::String&& value) { SetDirectoryArn(std::move(value)); return *this;}

    /**
     * <p>ARN associated with the <a>Directory</a> where both objects reside. For more
     * information, see <a>arns</a>.</p>
     */
    inline AttachPolicyRequest& WithDirectoryArn(const char* value) { SetDirectoryArn(value); return *this;}

    /**
     * <p>Reference associated with the policy object.</p>
     */
    inline const ObjectReference& GetPolicyReference() const{ return m_policyReference; }

    /**
     * <p>Reference associated with the policy object.</p>
     */
    inline void SetPolicyReference(const ObjectReference& value) { m_policyReferenceHasBeenSet = true; m_policyReference = value; }

    /**
     * <p>Reference associated with the policy object.</p>
     */
    inline void SetPolicyReference(ObjectReference&& value) { m_policyReferenceHasBeenSet = true; m_policyReference = std::move(value); }

    /**
     * <p>Reference associated with the policy object.</p>
     */
    inline AttachPolicyRequest& WithPolicyReference(const ObjectReference& value) { SetPolicyReference(value); return *this;}

    /**
     * <p>Reference associated with the policy object.</p>
     */
    inline AttachPolicyRequest& WithPolicyReference(ObjectReference&& value) { SetPolicyReference(std::move(value)); return *this;}

    /**
     * <p>Reference that identifies the object to which the policy will be
     * attached.</p>
     */
    inline const ObjectReference& GetObjectReference() const{ return m_objectReference; }

    /**
     * <p>Reference that identifies the object to which the policy will be
     * attached.</p>
     */
    inline void SetObjectReference(const ObjectReference& value) { m_objectReferenceHasBeenSet = true; m_objectReference = value; }

    /**
     * <p>Reference that identifies the object to which the policy will be
     * attached.</p>
     */
    inline void SetObjectReference(ObjectReference&& value) { m_objectReferenceHasBeenSet = true; m_objectReference = std::move(value); }

    /**
     * <p>Reference that identifies the object to which the policy will be
     * attached.</p>
     */
    inline AttachPolicyRequest& WithObjectReference(const ObjectReference& value) { SetObjectReference(value); return *this;}

    /**
     * <p>Reference that identifies the object to which the policy will be
     * attached.</p>
     */
    inline AttachPolicyRequest& WithObjectReference(ObjectReference&& value) { SetObjectReference(std::move(value)); return *this;}

  private:
    Aws::String m_directoryArn;
    bool m_directoryArnHasBeenSet;
    ObjectReference m_policyReference;
    bool m_policyReferenceHasBeenSet;
    ObjectReference m_objectReference;
    bool m_objectReferenceHasBeenSet;
  };

} // namespace Model
} // namespace CloudDirectory
} // namespace Aws
