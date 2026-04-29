import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearLogs, getLogs, log } from "./loggerService";

describe("loggerService", () => {
  beforeEach(() => {
    clearLogs();
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("agrega un log al buffer y lo devuelve con getLogs", () => {
    log("info", "test_event", { foo: "bar" });

    const logs = getLogs();

    expect(logs).toHaveLength(1);
    expect(logs[0].event).toBe("test_event");
    expect(logs[0].level).toBe("info");
    expect(logs[0].payload.foo).toBe("bar");
    expect(typeof logs[0].timestamp).toBe("string");
    expect(Number.isNaN(Date.parse(logs[0].timestamp))).toBe(false);
  });

  it("normaliza levels invalidos a info", () => {
    log("invalid_level", "test_event", {});

    expect(getLogs()[0].level).toBe("info");
  });

  it("clearLogs vacia el buffer", () => {
    log("info", "a", {});
    log("info", "b", {});

    clearLogs();

    expect(getLogs()).toEqual([]);
  });

  it("respeta el limite de 500 entradas (FIFO)", () => {
    for (let i = 0; i < 510; i += 1) {
      log("info", `event_${i}`, {});
    }

    const logs = getLogs();

    expect(logs).toHaveLength(500);
    expect(logs[0].event).toBe("event_10");
    expect(logs[499].event).toBe("event_509");
  });

  it("getLogs devuelve una copia, no la referencia interna", () => {
    log("info", "a", {});

    const snapshot = getLogs();
    snapshot.push({ fake: true });

    expect(getLogs()).toHaveLength(1);
  });
});
