import ExpressAdapter from "../adapters/ExpressAdapter.js";
import ToProcessController from "../controllers/toProcessController.js";

const adapter = new ExpressAdapter({});

export const toProcessRouter = () => {
  const router = adapter.createRouter();

  adapter.setRouteRouter({
    method: "post",
    route: "/",
    router,
    callback: [ToProcessController.executeMethod],
  });

  adapter.setRouteRouter({
    method: "get",
    route: "/",
    router,
    callback: [
      (_req, res) => {
        res
          .status(404)
          .json({ error: "Este endpoint se debe usar es en post" });
      },
    ],
  });

  return router;
};
