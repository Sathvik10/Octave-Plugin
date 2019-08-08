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
#include <aws/swf/SWF_EXPORTS.h>
#include <aws/swf/model/StartLambdaFunctionFailedCause.h>
#include <aws/core/utils/memory/stl/AWSString.h>
#include <utility>

namespace Aws
{
namespace Utils
{
namespace Json
{
  class JsonValue;
} // namespace Json
} // namespace Utils
namespace SWF
{
namespace Model
{

  /**
   * <p>Provides details for the <code>StartLambdaFunctionFailed</code>
   * event.</p><p><h3>See Also:</h3>   <a
   * href="http://docs.aws.amazon.com/goto/WebAPI/swf-2012-01-25/StartLambdaFunctionFailedEventAttributes">AWS
   * API Reference</a></p>
   */
  class AWS_SWF_API StartLambdaFunctionFailedEventAttributes
  {
  public:
    StartLambdaFunctionFailedEventAttributes();
    StartLambdaFunctionFailedEventAttributes(const Aws::Utils::Json::JsonValue& jsonValue);
    StartLambdaFunctionFailedEventAttributes& operator=(const Aws::Utils::Json::JsonValue& jsonValue);
    Aws::Utils::Json::JsonValue Jsonize() const;

    /**
     * <p>The ID of the <code>LambdaFunctionScheduled</code> event that was recorded
     * when this AWS Lambda function was scheduled. This information can be useful for
     * diagnosing problems by tracing back the chain of events leading up to this
     * event.</p>
     */
    inline long long GetScheduledEventId() const{ return m_scheduledEventId; }

    /**
     * <p>The ID of the <code>LambdaFunctionScheduled</code> event that was recorded
     * when this AWS Lambda function was scheduled. This information can be useful for
     * diagnosing problems by tracing back the chain of events leading up to this
     * event.</p>
     */
    inline void SetScheduledEventId(long long value) { m_scheduledEventIdHasBeenSet = true; m_scheduledEventId = value; }

    /**
     * <p>The ID of the <code>LambdaFunctionScheduled</code> event that was recorded
     * when this AWS Lambda function was scheduled. This information can be useful for
     * diagnosing problems by tracing back the chain of events leading up to this
     * event.</p>
     */
    inline StartLambdaFunctionFailedEventAttributes& WithScheduledEventId(long long value) { SetScheduledEventId(value); return *this;}

    /**
     * <p>The cause of the failure. This information is generated by the system and can
     * be useful for diagnostic purposes.</p> <note>If <b>cause</b> is set to
     * OPERATION_NOT_PERMITTED, the decision failed because it lacked sufficient
     * permissions. For details and example IAM policies, see <a
     * href="http://docs.aws.amazon.com/amazonswf/latest/developerguide/swf-dev-iam.html">Using
     * IAM to Manage Access to Amazon SWF Workflows</a>.</note>
     */
    inline const StartLambdaFunctionFailedCause& GetCause() const{ return m_cause; }

    /**
     * <p>The cause of the failure. This information is generated by the system and can
     * be useful for diagnostic purposes.</p> <note>If <b>cause</b> is set to
     * OPERATION_NOT_PERMITTED, the decision failed because it lacked sufficient
     * permissions. For details and example IAM policies, see <a
     * href="http://docs.aws.amazon.com/amazonswf/latest/developerguide/swf-dev-iam.html">Using
     * IAM to Manage Access to Amazon SWF Workflows</a>.</note>
     */
    inline void SetCause(const StartLambdaFunctionFailedCause& value) { m_causeHasBeenSet = true; m_cause = value; }

    /**
     * <p>The cause of the failure. This information is generated by the system and can
     * be useful for diagnostic purposes.</p> <note>If <b>cause</b> is set to
     * OPERATION_NOT_PERMITTED, the decision failed because it lacked sufficient
     * permissions. For details and example IAM policies, see <a
     * href="http://docs.aws.amazon.com/amazonswf/latest/developerguide/swf-dev-iam.html">Using
     * IAM to Manage Access to Amazon SWF Workflows</a>.</note>
     */
    inline void SetCause(StartLambdaFunctionFailedCause&& value) { m_causeHasBeenSet = true; m_cause = std::move(value); }

    /**
     * <p>The cause of the failure. This information is generated by the system and can
     * be useful for diagnostic purposes.</p> <note>If <b>cause</b> is set to
     * OPERATION_NOT_PERMITTED, the decision failed because it lacked sufficient
     * permissions. For details and example IAM policies, see <a
     * href="http://docs.aws.amazon.com/amazonswf/latest/developerguide/swf-dev-iam.html">Using
     * IAM to Manage Access to Amazon SWF Workflows</a>.</note>
     */
    inline StartLambdaFunctionFailedEventAttributes& WithCause(const StartLambdaFunctionFailedCause& value) { SetCause(value); return *this;}

    /**
     * <p>The cause of the failure. This information is generated by the system and can
     * be useful for diagnostic purposes.</p> <note>If <b>cause</b> is set to
     * OPERATION_NOT_PERMITTED, the decision failed because it lacked sufficient
     * permissions. For details and example IAM policies, see <a
     * href="http://docs.aws.amazon.com/amazonswf/latest/developerguide/swf-dev-iam.html">Using
     * IAM to Manage Access to Amazon SWF Workflows</a>.</note>
     */
    inline StartLambdaFunctionFailedEventAttributes& WithCause(StartLambdaFunctionFailedCause&& value) { SetCause(std::move(value)); return *this;}

    /**
     * <p>The error message (if any).</p>
     */
    inline const Aws::String& GetMessage() const{ return m_message; }

    /**
     * <p>The error message (if any).</p>
     */
    inline void SetMessage(const Aws::String& value) { m_messageHasBeenSet = true; m_message = value; }

    /**
     * <p>The error message (if any).</p>
     */
    inline void SetMessage(Aws::String&& value) { m_messageHasBeenSet = true; m_message = std::move(value); }

    /**
     * <p>The error message (if any).</p>
     */
    inline void SetMessage(const char* value) { m_messageHasBeenSet = true; m_message.assign(value); }

    /**
     * <p>The error message (if any).</p>
     */
    inline StartLambdaFunctionFailedEventAttributes& WithMessage(const Aws::String& value) { SetMessage(value); return *this;}

    /**
     * <p>The error message (if any).</p>
     */
    inline StartLambdaFunctionFailedEventAttributes& WithMessage(Aws::String&& value) { SetMessage(std::move(value)); return *this;}

    /**
     * <p>The error message (if any).</p>
     */
    inline StartLambdaFunctionFailedEventAttributes& WithMessage(const char* value) { SetMessage(value); return *this;}

  private:
    long long m_scheduledEventId;
    bool m_scheduledEventIdHasBeenSet;
    StartLambdaFunctionFailedCause m_cause;
    bool m_causeHasBeenSet;
    Aws::String m_message;
    bool m_messageHasBeenSet;
  };

} // namespace Model
} // namespace SWF
} // namespace Aws
