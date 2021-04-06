import supertest from "supertest";
import { app } from "../../app";
import setupTestWrapper from "../../shared/test-wrapper";
import { TaskModel } from "./task.model";

const request = supertest(app);
const test_db_name = "testing-tasks";
setupTestWrapper(test_db_name);

describe("Tasks", () => {
  it("Should save a new task", async (done) => {
    //check empty
    const emptyListResult = await request.get("/tasks");
    expect(emptyListResult.status).toBe(200);
    expect(emptyListResult.body).toHaveLength(0);

    // POST new task
    const postResult = await request.post("/tasks").send({
      label: "Hello",
    });

    // find new task from DB
    const task = await TaskModel.findOne({ label: postResult.body.label });
    expect(task).toHaveProperty("label");
    expect(task).toHaveProperty("done");
    expect(task).toHaveProperty("createdAt");
    expect(task).toHaveProperty("updatedAt");

    //check not empty
    const notEmptyListResult = await request.get("/tasks");
    expect(notEmptyListResult.body.length).toBeGreaterThan(0);

    done();
  });
});
