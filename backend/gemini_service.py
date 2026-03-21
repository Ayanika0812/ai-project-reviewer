import google.generativeai as genai
import os
import json
from prompts import STANDARD_SYSTEM_PROMPT, RECRUITER_SYSTEM_PROMPT, build_user_prompt

MODELS_TO_TRY = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-3-flash-preview",
    "gemini-3.1-flash-lite-preview",
    "gemini-3-pro-preview",
]


def _get_system_prompt(mode: str) -> str:
    return RECRUITER_SYSTEM_PROMPT if mode == "recruiter" else STANDARD_SYSTEM_PROMPT


async def _call_gemini(system_prompt: str, user_prompt: str) -> str:
    """Try each model in order, return first successful response text."""
    last_error = None
    for model_name in MODELS_TO_TRY:
        try:
            model = genai.GenerativeModel(
                model_name=model_name,
                system_instruction=system_prompt
            )
            response = model.generate_content(
                user_prompt,
                generation_config=genai.GenerationConfig(temperature=0)
            )
            print(f"[gemini] used model: {model_name}")
            return response.text
        except Exception as e:
            print(f"[gemini] {model_name} failed: {e}")
            last_error = e
            continue
    raise Exception(f"All models failed. Last error: {last_error}")


async def analyze_repo(repo_data: dict, mode: str) -> dict:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    user_prompt = build_user_prompt(repo_data)
    raw = await _call_gemini(_get_system_prompt(mode), user_prompt)
    raw = raw.strip()

    # Strip markdown code fences if Gemini wraps the JSON
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()

    return json.loads(raw)
