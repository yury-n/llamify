Populate 100 users

```
        for (let i = 1; i < 100; i++) {
          ((i) => {
            setTimeout(() => {
              const newKey = `teamMembers.${i}_kwxmofFGMFeC1qYzFPLebNKmq2k1`;
              firestore.doc(`/teams/${teamId}/`).update({
                [newKey]: {
                  ...data.teamMembers["kwxmofFGMFeC1qYzFPLebNKmq2k1"],
                  id: newKey,
                },
              });
            }, i * 200);
          })(i);
        }
```
