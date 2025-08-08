import functions from "firebase-functions"
import admin from "firebase-admin"
import { time } from "console";

admin.initializeApp();
const db=admin.firestore();

exports.sendTaskReminders=functions .region("asia-south1").pubsub.schedule("every 60 minutes")
                                .onRun(async()=>{
                                    const now=Date.now();
                                    const oneHour=60*60*1000;
                                    const oneDay=24*oneHour;

                                    const usersSnapshot=await db.collection("users").get();

                                    for(const userDoc of usersSnapshot.docs){
                                        const fcmToken=userDoc.data().fcmToken;
                                        if(!fcmToken) continue;

                                        const tasksSnapshot=await db.collection("users")
                                        .doc(userDoc.id)
                                        .collection("tasks")
                                        .get();


                                        for(const taskDoc of tasksSnapshot.docs){
                                            const task=taskDoc.data();
                                            const deadline=task.deadline?.toDate()|| task.deadline;

                                            if(!deadline) continue;

                                            const timeDiff=deadline.getTime()-now;

                                            if(timeDiff<=oneDay && timeDiff>oneHour && !task.notified1Day){
                                               await sendNotification(fcmToken,`Your task "${task.title}" is due on 1 day`)
                                               await taskDoc.ref.update({notified1Day:true})
                                            }
                                             if(timeDiff<=oneHour && timeDiff>0 && !task.notified1Hour){
                                               await sendNotification(fcmToken,`Your task "${task.title}" is due on 1 hour`)
                                                await taskDoc.ref.update({notified1Hour:true})
                                            }
                                        }
                                    }
                                });

                                async function sendNotification(token,message){
                                    try{
                                        await admin.messaging().send({
                                            notification:{
                                                title: "Task Reminder",
                                                body:message,
                                            }
                                            , token,
                                        })
                                        console.log("Sent",message)
                                    }catch(err){
                                        console.error(err)
                                    }
                                }


