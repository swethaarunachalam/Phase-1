const fs = require("fs").promises;
const path = "./tasks.json";


const loadTasks = async () => {
    try {
        const data = await fs.readFile(path, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return []; 
    }
};


const saveTasks = async (tasks) => {
    await fs.writeFile(path, JSON.stringify(tasks, null, 2));
};


const addTask = async (title, description) => {
    const tasks = await loadTasks();
    tasks.push({ id: tasks.length + 1, title, description, status: "pending" });
    await saveTasks(tasks);
    console.log(" Task added successfully!");
};

const listTasks = async (status = null) => {
    const tasks = await loadTasks();
    if (status) {
        console.log(`Tasks with status: ${status}`);
        console.log(tasks.filter((task) => task.status === status));
    } else {
        console.log(" All Tasks:");
        console.log(tasks);
    }
};


const updateTask = async (id, newStatus) => {
    let tasks = await loadTasks();
    tasks = tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
    );
    await saveTasks(tasks);
    console.log("Task updated successfully!");
};

const deleteTask = async (id) => {
    let tasks = await loadTasks();
    tasks = tasks.filter((task) => task.id !== id);
    await saveTasks(tasks);
    console.log(" Task deleted successfully!");
};


const command = process.argv[2];
const args = process.argv.slice(3);

(async () => {
    switch (command) {
        case "add":
            await addTask(args[0], args[1]);
            break;
        case "list":
            await listTasks(args[0]);
            break;
        case "update":
            await updateTask(parseInt(args[0]), args[1]);
            break;
        case "delete":
            await deleteTask(parseInt(args[0]));
            break;
        default:
            console.log(" Invalid command! Use add, list, update, or delete.");
    }
})();
