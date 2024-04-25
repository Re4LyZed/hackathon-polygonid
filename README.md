# Technical specification

# booking control

We are running a local polygoneID issuer node, that is using the columbus test net. The page will hang at the verify DID qrCode without a local deployment of this net.

Booking options a requested through the Camino Messenger via the the messenger bot, this request is over gRPC protocol.
Upon selection and booking, a credential is issued via polygonID and delivered through the notification service to the users polygonId wallet.

Verification is performed vid the request to the polygonID verification service, checking to see if the user has a valid hotel booking credential as well as exposing the users name and surname, pulled from the passport while hiding other irrelevant info, to the hotel for tax and legal reasons.

If both these checks pass i.e. valid booking and an issued passport then the check will pass, proving a valid booking and providing the users required details.

# Passport control

The passport control check operates in a similar way, though with a much simpler request. Only checking if the user has a valid passport. In the future this check will also include the issuer country id to validate the authenticity of the credential.

# Technologies

- polygonID
- camino messenger
- columbus net
- react
- vite
- mui
