# **CodeArchitect: Agentic Multi-Stage Framework for Intelligent Website Generation**

CodeArchitect is an autonomous Agentic AI system capable of generating **complete, functional websites** from **high-level natural language prompts**.
It uses a multi-agent architecture—**Planner**, **Architect**, and **Coder**—powered by the **Groq API**, coordinated through **LangChain** and **LangGraph**.
The system transforms user intent into structured plans, detailed task breakdowns, and executable HTML/CSS/JavaScript code with minimal human intervention.


---

## 🚀 **Features**

### 🔹 **1. Multi-Agent Workflow**

* **Planner Agent** – Interprets the prompt & generates a website plan
* **Architect Agent** – Converts the plan into detailed implementation steps
* **Coder Agent** – Generates HTML, CSS, JS via file-handling tools
* **Orchestrator** – Coordinates agents via LangGraph state machine


### 🔹 **2. End-to-End Website Generation**

* Accepts high-level natural language description
* Produces ready-to-run project folders
* Ensures inter-file consistency and coherent design


### 🔹 **3. Tool-Assisted File Handling**

Agents use structured function calls for:

* Reading files
* Writing files
* Listing directories
* Path-safe operations


### 🔹 **4. Context-Aware Code Generation**

Maintains:

* Variable consistency
* Styling uniformity
* Component dependencies


### 🔹 **5. High-Speed Reasoning via Groq API**

Optimized for low-latency, multi-stage reasoning and code synthesis.


---

## 📂 **Project Architecture**

CodeArchitect follows a 5-layer architecture:


1. **Input Layer** – User prompt intake
2. **Agent Orchestration Layer** – Planner → Architect → Coder
3. **Tool Integration Layer** – Groq + file management
4. **Code Generation Layer** – HTML/CSS/JS creation
5. **Output Layer** – Final website folder

---

## 🧠 **Agent Collaboration Model**

```
Planner → Architect → Coder → Output Website
         ↘ Orchestrator ↙
```

Each agent has specialized responsibilities and communicates via LangGraph.


---

## ⚙️ **Tech Stack**

### **Languages**

* Python 3.10+

### **Frameworks / Libraries**

* **LangChain** – agent orchestration
* **LangGraph** – workflow + state machine
* **LangChain-Groq** – Groq LLM integration
* **Pydantic** – structured models
* **python-dotenv** – environment management
* **OS / Pathlib** – secure file operations


---

## 📦 **Installation**

### 1. Clone Repository

```sh
git clone https://github.com/Amogh004/agentic-website-builder.git
cd agentic-website-builder
```

### 2. Create Virtual Environment

```sh
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install Requirements

*(if you have a requirements.txt)*

```sh
pip install -r requirements.txt
```

---

## 🔑 **Environment Setup**

Create a `.env` file:

```
GROQ_API_KEY=your_api_key_here
```

---

## ▶️ **Running the System**

```sh
python main.py
```

You will be prompted:

```
Describe the website you want to generate:
> A simple To-Do List web app with add/delete/mark complete features
```

The system will autonomously generate:

```
generatedproject/
   index.html
   styles.css
   script.js
```

---

## 🧪 **Testing & Validation**

The system was evaluated across:

* **Unit testing** – Planner, Architect, Coder, file tools
* **Integration testing** – multi-agent workflow
* **Performance testing** – multi-file website generation < 60s
* **Robustness testing** – error recovery for invalid paths, incomplete outputs


---

## 📊 **Results**

Successfully generated multiple web apps:

* ✔ To-Do List Application
* ✔ Calculator
* ✔ Timer
* ✔ Note-Taking App

With:

* Consistent styling
* Correct interactivity
* Coherent project structure


---

## 🏁 **Conclusion**

CodeArchitect demonstrates how agentic AI can automate **end-to-end website generation**, bridging human intent and functional software.
The system proves the viability of Planner–Architect–Coder pipelines, structured function-calling, and autonomous code generation using Groq-powered reasoning.


---

## 🛠 **Future Improvements**

* Multi-page website support
* Backend/database integration
* Natural-language debugging
* Deployment agent (Netlify/Vercel integration)
