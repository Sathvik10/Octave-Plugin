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
#include <aws/swf/SWFRequest.h>
#include <aws/core/utils/memory/stl/AWSString.h>
#include <aws/core/utils/memory/stl/AWSVector.h>
#include <aws/swf/model/Decision.h>
#include <utility>

namespace Aws
{
namespace SWF
{
namespace Model
{

  /**
   */
  class AWS_SWF_API RespondDecisionTaskCompletedRequest : public SWFRequest
  {
  public:
    RespondDecisionTaskCompletedRequest();
    Aws::String SerializePayload() const override;

    Aws::Http::HeaderValueCollection GetRequestSpecificHeaders() const override;


    /**
     * <p>The <code>taskToken</code> from the <a>DecisionTask</a>.</p>
     * <important><code>taskToken</code> is generated by the service and should be
     * treated as an opaque value. If the task is passed to another process, its
     * <code>taskToken</code> must also be passed. This enables it to provide its
     * progress and respond with results.</important>
     */
    inline const Aws::String& GetTaskToken() const{ return m_taskToken; }

    /**
     * <p>The <code>taskToken</code> from the <a>DecisionTask</a>.</p>
     * <important><code>taskToken</code> is generated by the service and should be
     * treated as an opaque value. If the task is passed to another process, its
     * <code>taskToken</code> must also be passed. This enables it to provide its
     * progress and respond with results.</important>
     */
    inline void SetTaskToken(const Aws::String& value) { m_taskTokenHasBeenSet = true; m_taskToken = value; }

    /**
     * <p>The <code>taskToken</code> from the <a>DecisionTask</a>.</p>
     * <important><code>taskToken</code> is generated by the service and should be
     * treated as an opaque value. If the task is passed to another process, its
     * <code>taskToken</code> must also be passed. This enables it to provide its
     * progress and respond with results.</important>
     */
    inline void SetTaskToken(Aws::String&& value) { m_taskTokenHasBeenSet = true; m_taskToken = std::move(value); }

    /**
     * <p>The <code>taskToken</code> from the <a>DecisionTask</a>.</p>
     * <important><code>taskToken</code> is generated by the service and should be
     * treated as an opaque value. If the task is passed to another process, its
     * <code>taskToken</code> must also be passed. This enables it to provide its
     * progress and respond with results.</important>
     */
    inline void SetTaskToken(const char* value) { m_taskTokenHasBeenSet = true; m_taskToken.assign(value); }

    /**
     * <p>The <code>taskToken</code> from the <a>DecisionTask</a>.</p>
     * <important><code>taskToken</code> is generated by the service and should be
     * treated as an opaque value. If the task is passed to another process, its
     * <code>taskToken</code> must also be passed. This enables it to provide its
     * progress and respond with results.</important>
     */
    inline RespondDecisionTaskCompletedRequest& WithTaskToken(const Aws::String& value) { SetTaskToken(value); return *this;}

    /**
     * <p>The <code>taskToken</code> from the <a>DecisionTask</a>.</p>
     * <important><code>taskToken</code> is generated by the service and should be
     * treated as an opaque value. If the task is passed to another process, its
     * <code>taskToken</code> must also be passed. This enables it to provide its
     * progress and respond with results.</important>
     */
    inline RespondDecisionTaskCompletedRequest& WithTaskToken(Aws::String&& value) { SetTaskToken(std::move(value)); return *this;}

    /**
     * <p>The <code>taskToken</code> from the <a>DecisionTask</a>.</p>
     * <important><code>taskToken</code> is generated by the service and should be
     * treated as an opaque value. If the task is passed to another process, its
     * <code>taskToken</code> must also be passed. This enables it to provide its
     * progress and respond with results.</important>
     */
    inline RespondDecisionTaskCompletedRequest& WithTaskToken(const char* value) { SetTaskToken(value); return *this;}

    /**
     * <p>The list of decisions (possibly empty) made by the decider while processing
     * this decision task. See the docs for the decision structure for details.</p>
     */
    inline const Aws::Vector<Decision>& GetDecisions() const{ return m_decisions; }

    /**
     * <p>The list of decisions (possibly empty) made by the decider while processing
     * this decision task. See the docs for the decision structure for details.</p>
     */
    inline void SetDecisions(const Aws::Vector<Decision>& value) { m_decisionsHasBeenSet = true; m_decisions = value; }

    /**
     * <p>The list of decisions (possibly empty) made by the decider while processing
     * this decision task. See the docs for the decision structure for details.</p>
     */
    inline void SetDecisions(Aws::Vector<Decision>&& value) { m_decisionsHasBeenSet = true; m_decisions = std::move(value); }

    /**
     * <p>The list of decisions (possibly empty) made by the decider while processing
     * this decision task. See the docs for the decision structure for details.</p>
     */
    inline RespondDecisionTaskCompletedRequest& WithDecisions(const Aws::Vector<Decision>& value) { SetDecisions(value); return *this;}

    /**
     * <p>The list of decisions (possibly empty) made by the decider while processing
     * this decision task. See the docs for the decision structure for details.</p>
     */
    inline RespondDecisionTaskCompletedRequest& WithDecisions(Aws::Vector<Decision>&& value) { SetDecisions(std::move(value)); return *this;}

    /**
     * <p>The list of decisions (possibly empty) made by the decider while processing
     * this decision task. See the docs for the decision structure for details.</p>
     */
    inline RespondDecisionTaskCompletedRequest& AddDecisions(const Decision& value) { m_decisionsHasBeenSet = true; m_decisions.push_back(value); return *this; }

    /**
     * <p>The list of decisions (possibly empty) made by the decider while processing
     * this decision task. See the docs for the decision structure for details.</p>
     */
    inline RespondDecisionTaskCompletedRequest& AddDecisions(Decision&& value) { m_decisionsHasBeenSet = true; m_decisions.push_back(std::move(value)); return *this; }

    /**
     * <p>User defined context to add to workflow execution.</p>
     */
    inline const Aws::String& GetExecutionContext() const{ return m_executionContext; }

    /**
     * <p>User defined context to add to workflow execution.</p>
     */
    inline void SetExecutionContext(const Aws::String& value) { m_executionContextHasBeenSet = true; m_executionContext = value; }

    /**
     * <p>User defined context to add to workflow execution.</p>
     */
    inline void SetExecutionContext(Aws::String&& value) { m_executionContextHasBeenSet = true; m_executionContext = std::move(value); }

    /**
     * <p>User defined context to add to workflow execution.</p>
     */
    inline void SetExecutionContext(const char* value) { m_executionContextHasBeenSet = true; m_executionContext.assign(value); }

    /**
     * <p>User defined context to add to workflow execution.</p>
     */
    inline RespondDecisionTaskCompletedRequest& WithExecutionContext(const Aws::String& value) { SetExecutionContext(value); return *this;}

    /**
     * <p>User defined context to add to workflow execution.</p>
     */
    inline RespondDecisionTaskCompletedRequest& WithExecutionContext(Aws::String&& value) { SetExecutionContext(std::move(value)); return *this;}

    /**
     * <p>User defined context to add to workflow execution.</p>
     */
    inline RespondDecisionTaskCompletedRequest& WithExecutionContext(const char* value) { SetExecutionContext(value); return *this;}

  private:
    Aws::String m_taskToken;
    bool m_taskTokenHasBeenSet;
    Aws::Vector<Decision> m_decisions;
    bool m_decisionsHasBeenSet;
    Aws::String m_executionContext;
    bool m_executionContextHasBeenSet;
  };

} // namespace Model
} // namespace SWF
} // namespace Aws
