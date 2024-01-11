export const catchResponseCommon = (res, controllerName, error) => {
    res.status(500).json({
     status: "ERROR",
     statusCode: 500,
     message: "ERROR",
     data: {
       controllerName: `${controllerName}`,
       err: error.message,
     },
   });
 };