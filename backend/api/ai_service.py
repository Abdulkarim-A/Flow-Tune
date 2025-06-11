import os
import json
import logging
from typing import List, Dict, Any
from datetime import datetime, timedelta
import google.generativeai as genai
from django.conf import settings

# Set up logging
logger = logging.getLogger(__name__)

class GeminiAIService:
    """Service for interacting with Google Gemini AI"""
    
    def __init__(self):
        # Configure Gemini API using Django settings
        api_key = settings.GOOGLE_GEMINI_API_KEY
        genai.configure(api_key=api_key)
        # Use the working gemini-2.0-flash model instead of deprecated gemini-pro
        self.model = genai.GenerativeModel('gemini-2.0-flash')
        logger.info(f"Initialized Gemini AI service with model: gemini-2.0-flash")
    
    def suggest_learning_goals(self, occupation: str, age: int, user_input: str) -> str:
        """
        Generate AI-suggested learning goals based on user input
        """
        prompt = f"""
        You are a learning advisor. A {age}-year-old professional working as a {occupation} 
        has expressed the following learning interest: "{user_input}"
        
        Please provide a refined, SMART learning goal that is:
        - Specific and clear
        - Measurable with concrete outcomes
        - Achievable given their background
        - Relevant to their profession and interests
        - Time-bound (suggest a reasonable timeframe)
        
        Keep the response concise, practical, and motivating. Format as a single paragraph.
        """
        
        try:
            logger.info(f"Generating learning goals for: {user_input}")
            response = self.model.generate_content(prompt)
            result = response.text.strip()
            logger.info(f"Successfully generated AI learning goal: {result[:100]}...")
            return result
        except Exception as e:
            logger.error(f"Error generating learning goals: {str(e)}")
            # Fallback response if AI fails
            return f"Learn {user_input} through structured practice and study, aiming to gain practical competency within 3 weeks."
    
    def generate_learning_program(self, user_goals: List[str], preferences: List[str], 
                                occupation: str, age: int) -> Dict[str, Any]:
        """
        Generate a 3-week learning program with 5 tasks per week
        """
        goals_text = "; ".join(user_goals)
        preferences_text = ", ".join(preferences)
        
        prompt = f"""
        Create a 3-week learning program for a {age}-year-old {occupation} with these goals: {goals_text}
        
        They prefer learning through: {preferences_text}
        
        For each week, provide exactly 5 learning tasks. Each task should have:
        - A clear, actionable title
        - A detailed description (2-3 sentences)
        - Content type (choose from: video, books, podcasts, blogs, buddy)
        - A realistic source or platform where they can find this content
        
        IMPORTANT: Return ONLY valid JSON in exactly this format (no extra text, no explanations):
        {{
            "week_1": {{
                "title": "Foundation Week",
                "description": "Build core understanding...",
                "tasks": [
                    {{
                        "title": "Task Title",
                        "description": "Detailed description of what to do",
                        "content_type": "video",
                        "source": "YouTube, Coursera, etc."
                    }}
                ]
            }},
            "week_2": {{
                "title": "Practice Week",
                "description": "Apply knowledge through hands-on practice...",
                "tasks": [
                    {{
                        "title": "Task Title",
                        "description": "Detailed description of what to do",
                        "content_type": "books",
                        "source": "Amazon, Library, etc."
                    }}
                ]
            }},
            "week_3": {{
                "title": "Integration Week",
                "description": "Consolidate learning and plan for continued growth...",
                "tasks": [
                    {{
                        "title": "Task Title",
                        "description": "Detailed description of what to do",
                        "content_type": "buddy",
                        "source": "Community forums, etc."
                    }}
                ]
            }}
        }}
        
        Ensure tasks build progressively and align with their preferred learning methods.
        """
        
        try:
            logger.info(f"Generating learning program for goals: {goals_text[:100]}...")
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Try to parse as JSON, fall back to structured response if needed
            try:
                # First try direct parsing
                result = json.loads(response_text)
                logger.info(f"Successfully generated AI learning program with {len(result)} weeks")
                return result
            except json.JSONDecodeError:
                # Try to extract JSON from markdown code blocks or other formatting
                logger.info("Direct JSON parsing failed, attempting to extract JSON from response")
                
                # Look for JSON in code blocks
                if "```json" in response_text:
                    start_idx = response_text.find("```json") + 7
                    end_idx = response_text.find("```", start_idx)
                    if end_idx != -1:
                        json_text = response_text[start_idx:end_idx].strip()
                        try:
                            result = json.loads(json_text)
                            logger.info(f"Successfully extracted JSON from markdown with {len(result)} weeks")
                            return result
                        except json.JSONDecodeError:
                            pass
                
                # Look for JSON between { and } brackets
                if "{" in response_text and "}" in response_text:
                    start_idx = response_text.find("{")
                    end_idx = response_text.rfind("}") + 1
                    json_text = response_text[start_idx:end_idx].strip()
                    try:
                        result = json.loads(json_text)
                        logger.info(f"Successfully extracted JSON from brackets with {len(result)} weeks")
                        return result
                    except json.JSONDecodeError:
                        pass
                
                logger.warning(f"All JSON extraction attempts failed, using fallback program. Response was: {response_text[:200]}...")
                return self._create_fallback_program(user_goals, preferences)
                
        except Exception as e:
            logger.error(f"Error generating learning program: {str(e)}")
            return self._create_fallback_program(user_goals, preferences)
    
    def _create_fallback_program(self, goals: List[str], preferences: List[str]) -> Dict[str, Any]:
        """Fallback learning program if AI generation fails"""
        primary_content = preferences[0] if preferences else 'video'
        goal_text = goals[0] if goals else 'your learning goal'
        
        return {
            "week_1": {
                "title": "Foundation Week",
                "description": f"Build fundamental understanding of {goal_text}",
                "tasks": [
                    {
                        "title": f"Introduction to {goal_text}",
                        "description": "Get familiar with basic concepts and terminology",
                        "content_type": primary_content,
                        "source": "YouTube, Coursera, or relevant online platform"
                    },
                    {
                        "title": "Research key concepts",
                        "description": "Identify and study 3-5 core concepts you need to master",
                        "content_type": "blogs",
                        "source": "Medium, industry blogs, or documentation"
                    },
                    {
                        "title": "Find learning resources",
                        "description": "Curate a list of quality learning materials for your goal",
                        "content_type": primary_content,
                        "source": "Various educational platforms"
                    },
                    {
                        "title": "Join community",
                        "description": "Find and join an online community related to your learning goal",
                        "content_type": "buddy",
                        "source": "Reddit, Discord, Slack communities"
                    },
                    {
                        "title": "Set learning schedule",
                        "description": "Create a realistic daily/weekly study schedule that fits your lifestyle",
                        "content_type": "blogs",
                        "source": "Productivity blogs and planning resources"
                    }
                ]
            },
            "week_2": {
                "title": "Practice Week",
                "description": "Apply knowledge through hands-on practice and exercises",
                "tasks": [
                    {
                        "title": "Complete beginner exercises",
                        "description": "Work through basic practice exercises or tutorials",
                        "content_type": primary_content,
                        "source": "Educational platforms or tutorial sites"
                    },
                    {
                        "title": "Start a small project",
                        "description": "Begin a simple project to apply what you've learned",
                        "content_type": "video",
                        "source": "YouTube tutorials or project-based courses"
                    },
                    {
                        "title": "Connect with peers",
                        "description": "Engage with others learning similar topics, share progress",
                        "content_type": "buddy",
                        "source": "Online communities or study groups"
                    },
                    {
                        "title": "Document learning",
                        "description": "Write about what you've learned and challenges faced",
                        "content_type": "blogs",
                        "source": "Personal blog or learning journal"
                    },
                    {
                        "title": "Seek feedback",
                        "description": "Get feedback on your project or understanding from experienced practitioners",
                        "content_type": "buddy",
                        "source": "Mentorship platforms or community forums"
                    }
                ]
            },
            "week_3": {
                "title": "Integration Week",
                "description": "Consolidate learning and plan for continued growth",
                "tasks": [
                    {
                        "title": "Complete your project",
                        "description": "Finish and polish your learning project from week 2",
                        "content_type": primary_content,
                        "source": "Continue with chosen platform"
                    },
                    {
                        "title": "Review and reflect",
                        "description": "Assess your progress, identify strengths and areas for improvement",
                        "content_type": "blogs",
                        "source": "Self-reflection or learning blogs"
                    },
                    {
                        "title": "Share your work",
                        "description": "Present your project or learning to others for feedback",
                        "content_type": "buddy",
                        "source": "Community forums or presentation platforms"
                    },
                    {
                        "title": "Plan next steps",
                        "description": "Create a plan for continuing your learning journey beyond these 3 weeks",
                        "content_type": "blogs",
                        "source": "Learning strategy resources"
                    },
                    {
                        "title": "Celebrate progress",
                        "description": "Acknowledge your achievements and reward yourself for completing the program",
                        "content_type": "buddy",
                        "source": "Share with friends, family, or community"
                    }
                ]
            }
        }
    
    def chat_response(self, user_message: str, context: str = "general") -> str:
        """
        Generate AI chat responses for user interactions
        """
        system_prompt = """You are a helpful learning assistant. Be encouraging, concise, and practical. 
        Focus on helping users with their learning goals and providing actionable advice."""
        
        prompt = f"{system_prompt}\n\nUser message: {user_message}\nContext: {context}\n\nResponse:"
        
        try:
            logger.info(f"Generating chat response for message: {user_message[:50]}...")
            response = self.model.generate_content(prompt)
            result = response.text.strip()
            logger.info(f"Successfully generated chat response: {result[:100]}...")
            return result
        except Exception as e:
            logger.error(f"Error generating chat response: {str(e)}")
            return "I'm here to help with your learning journey! Could you tell me more about what you'd like to achieve?"


# Global instance
ai_service = GeminiAIService() 