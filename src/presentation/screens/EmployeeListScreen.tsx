import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { GetEmployees } from '../../usecases/GetEmployees';
import { EmployeeRepository } from '../../data/repositories/EmployeeRepository';
import { EmployeeDataSourceImpl } from '../../data/datasources/EmployeeDataSource';
import { Employee } from '../../domain/models/Employee';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

const EmployeeListScreen = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const dataSource = new EmployeeDataSourceImpl();
        const repository = new EmployeeRepository(dataSource);
        const getEmployees = new GetEmployees(repository);
        const result = await getEmployees.execute();
        setEmployees(result);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar funcionários');
        setEmployees([]);
      } finally {
        setLoading(false); 
      }
    };

    fetchEmployees();
  }, []);


  const filteredEmployees = employees.filter((employee) => {
    const searchLower = search.toLowerCase();
    
    return (
      employee.name.toLowerCase().includes(searchLower) ||
      employee.job.toLowerCase().includes(searchLower) ||
      employee.phone.toLowerCase().includes(searchLower)
      
    );
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  };

  const formatDate = (date: string) => {
    return moment(date).format('DD/MM/YYYY');
  };

  return (
<ScrollView 
  style={styles.container} 
  contentContainerStyle={styles.scrollViewContent} 
  testID="employee-list-screen"
>{/* Cabeçalho */}
      <View style={styles.header}>
        {/* Ícone de perfil e título */}
        <View style={styles.profileContainer}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileText}>CG</Text>
          </View>
        </View>

        {/* Ícone de notificações */}
        <View style={styles.notificationContainer}>
        <TouchableOpacity onPress={() => { /* Handle notification press */ }}> {/* Make icon tappable */}
          <Icon name="notifications-none" size={36} color="#000" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>02</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

      {/* Campo de pesquisa */}
      <Text style={styles.title}>Funcionários</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#1C1C1C" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          placeholderTextColor="#1C1C1C"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Tabela com borda */}
      <View style={styles.tableContainer}>
        {/* Cabeçalho da tabela */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.photoHeader]}>Foto</Text>
          <Text style={[styles.headerText, styles.nameHeader]}>Nome</Text>
          <View style={styles.dot} />
        </View>

        {/* Lista de funcionários */}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : filteredEmployees.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum funcionário encontrado</Text>
        ) : (
          <FlatList
            data={filteredEmployees}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                <View style={styles.row}>
                  <View style={styles.photoColumn}>
                    <Image source={{ uri: item.image }} style={styles.employeeImage} />
                  </View>
                  <View style={styles.nameColumn}>
                    <Text style={styles.employeeName}>{item.name}</Text>
                  </View>
                  <Icon
                    name={expandedId === item.id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={20}
                    color="#0500FF"
                  />
                </View>
                {expandedId === item.id && (
                  <View style={styles.expandedInfo}>
                    <View style={styles.infoRow}>
                      <Text  style={styles.infoLabel}>Cargo</Text>
                      <Text style={styles.infoValue}>{item.job}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Data de admissão</Text>
                      <Text style={styles.infoValue}>{formatDate(item.admission_date)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Telefone</Text>
                      <Text style={styles.infoValue}>{formatPhone(item.phone)}</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 106,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1C1C1C',
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
    marginBottom: 12,
    fontFamily: 'Helvetica',
  },
  notificationContainer: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: -1,  
    right: -1,
    backgroundColor: '#0500FF', 
    borderRadius: 12, 
    width: 20,       
    height: 20,      
    justifyContent: 'center',
    padding: 8,
    
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 50,
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1C',
    textAlignVertical: 'center',
    fontFamily: 'Helvetica',
  },
  scrollViewContent: {
    flexGrow: 1, 
  },
  tableContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#EDEFFB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19.54,
    letterSpacing: 0,
    fontFamily: 'Helvetica',
  },
  photoHeader: {
    width: 60,
    textAlign: 'center',
  },
  nameHeader: {
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginLeft: 4,
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  photoColumn: {
    width: 60,
    alignItems: 'center',
  },
  nameColumn: {
    flex: 1,
  },
  employeeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  employeeName: {
    fontSize: 16,
    fontFamily: 'Helvetica',
  },
  expandedInfo: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#1C1C1C',
    fontWeight: '600',
    fontFamily: 'Helvetica',
  },
  infoValue: {
    fontSize: 14,
    color: '#1C1C1C',
    fontWeight: '400',
    fontFamily: 'Helvetica',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
  },
});

export default EmployeeListScreen;