export function CenterDetailScreen({ route, navigation }) {
  const { center } = route.params;

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.coordinates.lat},${center.coordinates.lng}`;
    Linking.openURL(url);
  };

  const callCenter = () => {
    Linking.openURL(`tel:${center.phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.detailHeader}>
          <Text style={styles.detailName}>{center.name}</Text>
          <View style={styles.verificationRow}>
            {center.verified && (
              <View style={styles.verifiedBadge}>
                <MaterialIcons name="verified" size={16} color="white" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
            <View style={[styles.typeBadge, { backgroundColor: getTypeColor(center.type) }]}>
              <Text style={styles.typeText}>{center.type}</Text>
            </View>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>📍 Location & Contact</Text>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="place" size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoText}>{center.address}</Text>
              <Text style={styles.distanceText}>{center.distance} km away</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.infoRow} onPress={callCenter}>
            <MaterialIcons name="phone" size={20} color="#4CAF50" />
            <Text style={[styles.infoText, styles.linkText]}>{center.phone}</Text>
          </TouchableOpacity>

          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={20} color="#666" />
            <Text style={styles.infoText}>{center.hours}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="star" size={20} color="#FFD700" />
            <Text style={styles.infoText}>{center.rating} ⭐ rating</Text>
          </View>
        </View>

        {/* Accepted Items */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>♻️ Accepted Items</Text>
          <View style={styles.acceptedItemsGrid}>
            {center.acceptedItems.map((item, index) => (
              <View key={index} style={styles.acceptedItemCard}>
                <Text style={styles.acceptedItemIcon}>{getItemIcon(item)}</Text>
                <Text style={styles.acceptedItemName}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Special Services */}
        {center.specialServices && center.specialServices.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>⭐ Special Services</Text>
            {center.specialServices.map((service, index) => (
              <View key={index} style={styles.serviceRow}>
                <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={openDirections}>
            <MaterialIcons name="directions" size={20} color="white" />
            <Text style={styles.primaryButtonText}>Get Directions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={callCenter}>
            <MaterialIcons name="phone" size={20} color="#4CAF50" />
            <Text style={styles.secondaryButtonText}>Call Center</Text>
          </TouchableOpacity>
        </View>

        {/* Ask Question Button */}
        <TouchableOpacity
          style={styles.questionButton}
          onPress={() => navigation.navigate('CreateInquiry', { 
            centerName: center.name,
            centerId: center.id 
          })}
        >
          <MaterialIcons name="help" size={20} color="#FF9800" />
          <Text style={styles.questionButtonText}>Ask Question About This Center</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
